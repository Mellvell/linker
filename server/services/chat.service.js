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

		const participants = [newChat.user_id1, newChat.user_id2]
		participants.forEach(participant => {
			const socketId = getReceiverSocketId(participant)
			if (socketId) {
				getIO()
					.to(socketId)
					.emit('newChat', {
						chatId: newChat.id,
						participants: [newChat.user_id1, newChat.user_id2],
					})
			}
		})
		return newChat
	}

	async getChats(user_id) {
		if(!user_id){ 
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
