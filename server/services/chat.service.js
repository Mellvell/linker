const pool = require('../config/db')
const { getReceiverSocketId } = require('../socket/socket')
const { getIO } = require('../socket/io')

class ChatService {
	async createChat(senderId, receiverId) {
		if (!receiverId) {
			throw new Error('Receiver ID is required')
		}
		if (senderId === receiverId) {
			throw new Error('Sender and receiver IDs cannot be the same')
		}

		const checkQuery = `
    SELECT chat_id FROM direct_chats
    WHERE (user1_id = $1 AND user2_id = $2)
    OR (user1_id = $2 AND user2_id = $1) `

		const checkResult = await pool.query(checkQuery, [senderId, receiverId])
		if (checkResult.rows.length > 0) {
			throw new Error('Chat already exists')
		}

		const insertQuery = `
    INSERT INTO direct_chats (user1_id, user2_id)
    VALUES ($1, $2)
    RETURNING *
    `
		const insertResult = await pool.query(insertQuery, [senderId, receiverId])
		const newChat = insertResult.rows[0]
		return newChat
	}

	async deleteChat(chatId, userId) {
		if (!chatId || !userId) {
			throw new Error('Chat ID and User ID are required')
		}

		const deleteQuery = `
    DELETE FROM direct_chats
    WHERE chat_id = $1 AND (user1_id = $2 OR user2_id = $2)
    RETURNING chat_id
    `
		const result = await pool.query(deleteQuery, [chatId, userId])

		if (result.rows.length === 0) {
			throw new Error(
				'Chat not found or you do not have permission to delete it'
			)
		}

		return { success: true, chatId: result.rows[0].chat_id }
	}

	async getChats(user_id) {
		if (!user_id) {
			throw new Error('missing user id')
		}

		const query = `
		SELECT * FROM direct_chats
		WHERE user1_id = $1 OR user2_id = $1
		`
		const result = await pool.query(query, [user_id])

		return result.rows
	}
}

module.exports = new ChatService()
