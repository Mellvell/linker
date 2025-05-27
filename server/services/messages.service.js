const pool = require('../config/db')
const cloudinary = require('../config/cloudinary')
const path = require('path')
const DatauriParser = require('datauri/parser')
const iconv = require('iconv-lite')

const parser = new DatauriParser()

class MessagesService {
	async createMessage(senderId, receiverId, chatId, content, file) {
		console.log(
			`Информация на входе ${senderId} ${receiverId} ${chatId} ${content}`
		)

		if (!senderId || !receiverId || !chatId || !content) {
			throw new Error('All fields are required')
		}

		const sentAt = new Date()
		let fileUrl = null
		let fileName = null

		if (file) {
			console.log('File details before upload:', {
				originalname: file.originalname,
				bufferSize: file.buffer.length,
				mimetype: file.mimetype,
			})

			if (!file.buffer || file.buffer.length === 0) {
				throw new Error('File buffer is empty or corrupted')
			}

			try {
				const ext = path.extname(file.originalname).replace('.', '') // Получаем расширение без точки (например, 'docx')
				const dataUri = parser.format(ext, file.buffer)
				console.log('Data URI start:', dataUri.content.substring(0, 50)) // Первые 50 символов
				const uploadResult = await cloudinary.uploader.upload(dataUri.content, {
					folder: 'messages',
					resource_type: 'auto',
					format: ext, // Явно указываем формат файла
					original_filename: file.originalname,
				})
				console.log('Cloudinary upload result:', uploadResult)
				fileUrl = uploadResult.secure_url
				fileName = file.originalname
			} catch (error) {
				console.error('Cloudinary upload error:', error)
				throw new Error('Failed to upload file to Cloudinary: ' + error.message)
			}
		}

		// Остальной код остается без изменений
		const insertQuery = `
			INSERT INTO messages (chat_id, receiver_id, sender_id, content, file_url, file_name, sent_at, is_read)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
			RETURNING chat_id, receiver_id, sender_id, content, file_url, file_name, sent_at, is_read
		`
		const values = [
			chatId,
			receiverId,
			senderId,
			content,
			fileUrl || null,
			fileName || null,
			sentAt,
			false,
		]
		const result = await pool.query(insertQuery, values)
		if (result.rows.length === 0) {
			throw new Error('Message creation failed')
		}

		const newMessage = result.rows[0]
		return newMessage
	}

	async getMessages(userToChatId, myId) {
		if (!userToChatId || !myId) {
			throw new Error('All fields are required')
		}

		const query =
			'SELECT * FROM messages WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)'
		const values = [userToChatId, myId]
		const result = await pool.query(query, values)
		console.log('Messages retrieved:', result.rows)

		return result.rows
	}
}

module.exports = new MessagesService()
