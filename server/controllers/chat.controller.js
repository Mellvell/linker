const chatService = require('../services/chat.service')
const { getReceiverSocketId } = require('../socket/socket')

class ChatController {
	async createChat(req, res, next) {
		try {
			const { receiverId } = req.body
			const senderId = req.user.id

			const newChat = await chatService.createChat(senderId, receiverId)

			const receiverSocketId = getReceiverSocketId(receiverId)
			console.log('Receiver socket ID:', receiverSocketId)

			// Отправляем WebSocket-сообщение только если receiverSocketId существует
			if (receiverSocketId) {
				console.log('Emitting newChat to receiver:', receiverSocketId)
				req.io.to(receiverSocketId).emit('newChat', newChat)
			} else {
				console.log('Receiver not connected, skipping WebSocket emission')
			}

			res.status(201).json(newChat)
		} catch (error) {
			next(error)
		}
	}

	async deleteChat(req, res, next) {
		try {
			const { chatId, receiverId } = req.body
			const userId = req.user.id
			console.log(
				'Deleting chat with ID:',
				chatId,
				'for user ID:',
				userId,
				'and receiver ID:',
				receiverId
			)
			await chatService.deleteChat(chatId, userId)

			const receiverSocketId = getReceiverSocketId(receiverId)
			if (receiverSocketId) {
				req.io.to(receiverSocketId).emit('deleteChat', { chatId })
				req.io.to(userId).emit('deleteChat', { chatId })
			}

			res.status(200).json({ message: 'Chat deleted successfully.', chatId })
		} catch (error) {
			next(error)
		}
	}

	async getChats(req, res, next) {
		try {
			const id = req.user.id

			const chats = await chatService.getChats(id)
			console.log('chats', chats)

			res.status(200).json(chats)
		} catch (error) {
			console.log(error)
			res.status(404).json({ Message: 'Missing user id' })
		}
	}
}

module.exports = new ChatController()
