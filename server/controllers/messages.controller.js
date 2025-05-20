const messagesService = require('../services/messages.service')
const { getReceiverSocketId } = require('../socket/socket')

class MessagesController {
	async sendMessage(req, res) {
		try {
			console.log('Sending message')
			console.log('Request body:', req.body)

			const { receiverId, chatId, message } = req.body
			const senderId = req.user.id // Assuming you have user ID in req.user
			const file = req.file

			const newMessage = await messagesService.createMessage(
				senderId,
				receiverId,
				chatId,
				message,
				file
			)
			console.log('New message created:', newMessage)

			if (!newMessage) {
				return res.status(400).json({ error: 'Message creation failed' })
			}

      console.log(receiverId);
      
			const receiverSocketId = getReceiverSocketId(receiverId)
			console.log('Receiver socket ID:', receiverSocketId)

			// Отправляем WebSocket-сообщение только если receiverSocketId существует
			if (receiverSocketId) {
				console.log('Emitting newMessage to receiver:', receiverSocketId)
				req.io.to(receiverSocketId).emit('newMessage', newMessage)
			} else {
				console.log('Receiver not connected, skipping WebSocket emission')
			}

			return res.status(201).json(newMessage)
		} catch (error) {
			console.error('Error in sendMessage:', error.stack) 
			return res.status(500).json({ error: error.message })
		}
	}

	async getMessages(req, res) {
		try {
			const userToChatId = req.params.userToChatId
			const myId = req.user.id
			const messages = await messagesService.getMessages(userToChatId, myId)

			if (!messages) {
				return res.status(404).json({ error: 'Messages not found' })
			}
			return res.status(200).json(messages)
		} catch (error) {
			return res.status(500).json({ error: error.message })
		}
	}
}

module.exports = new MessagesController()
