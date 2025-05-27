const generateAvatar = require('../utils/generateAvatar')
const saveAvatar = require('../utils/saveAvatar')
const generateUniqueUsername = require('../utils/generateUniqueUsername')
const pool = require('../config/db')
const bcrypt = require('bcrypt')
const UserDto = require('../dtos/user.dto')
const tokenService = require('./token.service')
const ApiError = require('../exceptions/api-error')
const cloudinary = require('../config/cloudinary')
const path = require('path')
const DatauriParser = require('datauri/parser')

const parser = new DatauriParser()

class UserService {
	async registrationUser(userData) {
		const candidate = await pool.query(`SELECT * FROM users WHERE email = $1`, [
			userData.email,
		])
		if (candidate.rows.length > 0) {
			throw ApiError.BadRequest('Пользователь с таким email уже существует')
		}

		const { name, surname, email, password } = userData
		const username = generateUniqueUsername()
		const avatarBuffer = generateAvatar(name)

		console.log(avatarBuffer, 'Avatar Buffer:', avatarBuffer);
		
		let avatarPath;
		if (avatarBuffer) {
			try {
				const dataUri = parser.format('.png', avatarBuffer)
				const uploadResult = await cloudinary.uploader.upload(dataUri.content, {
					folder: 'avatars',
					resource_type: 'image',
				})
				avatarPath = uploadResult.secure_url
				console.log('Avatar uploaded to Cloudinary:', avatarPath)
			} catch (error) {
				throw new Error(
					'Failed to upload avatar to Cloudinary: ' + error.message
				)
			}
		}

		const hashPassword = await bcrypt.hash(password, 10)

		const query = `INSERT INTO users (name, surname, email, hashPassword, username, avatar) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
		const values = [name, surname, email, hashPassword, username, avatarPath]

		const result = await pool.query(query, values)
		const userDto = new UserDto(result.rows[0])

		const tokens = await tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto,
		}
	}

	

	async loginUser(userData) {
		const { email, password } = userData
		const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
			email,
		])
		if (user.rows.length === 0) {
			throw ApiError.BadRequest('Пользователь с таким email не найден')
		}

		const isPasswordEqual = await bcrypt.compare(
			password,
			user.rows[0].hashpassword
		)
		if (!isPasswordEqual) {
			throw ApiError.BadRequest('Неверный пароль')
		}

		const userDto = new UserDto(user.rows[0])
		const tokens = await tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto,
		}
	}

	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken)
		return token
	}

	async updateUser(userId, userData, avatar) {
		if (!userId) {
			throw ApiError.BadRequest('user id required')
		}

		const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [
			userId,
		])

		if (user.rows.length === 0) {
			throw ApiError.BadRequest('Пользователь не найден')
		}

		const { name, surname, email, username } = userData

		console.log('User Avatar:', avatar);
		

		let avatarUrl;
		if(avatar){
			try {
				const ext = path.extname(avatar.originalname).toString()
				const dataUri = parser.format(ext, avatar.buffer)
				const uploadResult = await cloudinary.uploader.upload(dataUri.content, {
					folder: 'avatars',
					resource_type: 'image',
				})
				avatarUrl = uploadResult.secure_url
				console.log('Avatar uploaded to Cloudinary:', avatarUrl);
				
			} catch (error) {
				throw new Error(
					'Failed to upload avatar to Cloudinary: ' + error.message
				)
			}
		}

		const query = `
			UPDATE users 
			SET name = $1, surname = $2, email = $3, username = $4, avatar = $5 
			WHERE id = $6 
			RETURNING *
		`

		const values = [
			name || user.rows[0].name,
			surname || user.rows[0].surname,
			email	|| user.rows[0].email,
			username || user.rows[0].username,
			avatarUrl || user.rows[0].avatar, // Используем существующий аватар, если новый не предоставлен
			userId,
		]

		const result = await pool.query(query, values)
		if (result.rows.length === 0) {
			throw ApiError.BadRequest('Ошибка при обновлении пользователя')
		}

		console.log('Updated user:', result.rows[0]);
		

		const updatedUser = new UserDto(result.rows[0])
		const tokens = await tokenService.generateTokens({ ...updatedUser })
		await tokenService.saveToken(updatedUser.id, tokens.refreshToken)
		return {
			...tokens,
			user: updatedUser,
			message: 'Пользователь успешно обновлен',
		}
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError()
		}
		const userData = tokenService.validateRefreshToken(refreshToken)
		const tokenFromDb = await tokenService.findToken(refreshToken)
		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError()
		}
		const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [
			userData.id,
		])
		const userDto = new UserDto(user.rows[0])
		const tokens = await tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto,
			message: 'Токены успешно обновлены',
		}
	}

	async getUser(userId) {
		if (!userId) {
			throw ApiError.BadRequest('Пользователь не найден')
		}
		const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId])
		if (user.rows.length === 0) {
			throw ApiError.BadRequest('Пользователь не найден')
		}
		const userDto = new UserDto(user.rows[0])
		return userDto
	}

	async getSearchUser(search) {
		if (!search) {
			throw ApiError.BadRequest('Поисковый запрос не указан')
		}

		// Удаляем символ @ из запроса, если он есть (для username)
		const cleanedSearch = search.replace(/^@/, '').trim()

		try {
			// Поиск по username или name с использованием ILIKE
			const users = await pool.query(
				`SELECT * FROM users WHERE username ILIKE $1 OR name ILIKE $1`,
				[`%${cleanedSearch}%`]
			)

			if (users.rows.length === 0) {
				return []
			}

			// Преобразуем результаты в DTO
			const userDto = users.rows.map(user => new UserDto(user))
			return userDto
		} catch (error) {
			// Если ошибка уже является ApiError, пробрасываем её
			if (error instanceof ApiError) {
				throw error
			}
			// Иначе пробрасываем серверную ошибку
			throw ApiError.Internal('Ошибка при поиске пользователей')
		}
	}
}

module.exports = new UserService()
