const userService = require('../services/user.service')

class UserController {
	async registration(req, res, next) {
		try {
			const candidate = req.body
			const result = await userService.registrationUser(candidate)
			console.log('Registration result:', result);
			
			res.cookie('refreshToken', result.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})

			res.status(201).json(result)
		} catch (error) {
			next(error)
		}
	}
	async login(req, res, next) {
		try {
			const candidate = req.body
			const result = await userService.loginUser(candidate)
			res.cookie('refreshToken', result.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
			res.status(200).json(result)
		} catch (error) {
			next(error)
		}
	}
	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const token = await userService.logout(refreshToken)
			res.clearCookie('refreshToken')
			return res.status(200).json(token)
		} catch (error) {
			next(error)
		}
	}

	async updateUser(req, res, next) {
		try {
			console.log('Request body:', req.body)
			console.log('Request file:', req.file)

			const userId = req.user.id 
			const userData = req.body
			const avatar = req.file
			console.log('Parsed data:', userData);

			const updatedUser = await userService.updateUser(userId, userData, avatar)

			res.cookie('refreshToken', updatedUser.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})

			return res.status(200).json(updatedUser)
		} catch (error) {
			next(error)
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const token = await userService.refresh(refreshToken)
			res.cookie('refreshToken', token.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
			return res.status(200).json(token)
		} catch (error) {
			next(error)
		}
	}

	async getUser(req, res, next) {
		try {
			const id = req.params.userId
			const user = await userService.getUser(id)
			return res.status(200).json(user)
		} catch (error) {
			next(error)
		}
	}

	async getSearchUser(req, res, next) {
		try {
			console.log('getSearchUser')
			const { query } = req.query 
			console.log(`search: ${query}`)

			const users = await userService.getSearchUser(query) 
			return res.status(200).json(users)
		} catch (error) {
			next(error)
		}
	}

}

module.exports = new UserController()
