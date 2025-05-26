const pool = require('../config/db')
const cloudinary = require('../config/cloudinary')
const path = require('path')
const DatauriParser = require('datauri/parser')

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
		if (file) {
			try {
				const ext = path.extname(file.originalname).toString()
				const dataUri = parser.format(ext, file.buffer)
				const uploadResult = await cloudinary.uploader.upload(dataUri.content, {
					folder: 'messages',
					resource_type: 'auto',
				})
				fileUrl = uploadResult.secure_url
			} catch (error) {
				throw new Error(
					'Failed to upload avatar to Cloudinary: ' + error.message
				)
			}
		}

		if (chatId) {
			const chatCheckQuery = `
        SELECT chat_id FROM direct_chats WHERE chat_id = $1
      `
			const chatCheckResult = await pool.query(chatCheckQuery, [chatId])
			if (chatCheckResult.rows.length === 0) {
				throw new Error('Direct chat does not exist')
			}
		}

		const insertQuery = `
      INSERT INTO messages (chat_id, receiver_id, sender_id, content, file_url, sent_at, is_read)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING chat_id, receiver_id, sender_id, content, file_url, sent_at, is_read
    `
		const values = [
			chatId,
			receiverId,
			senderId,
			content,
			fileUrl || null,
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
