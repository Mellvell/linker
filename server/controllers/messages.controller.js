const messagesService = require('../services/messages.service')
const { getReceiverSocketId } = require('../socket/socket')

class MessagesController {
	async sendMessage(req, res, next) {
		try {
			console.log('Request body:', req.body)
			console.log('Request file:', req.file)

			const parsedData = req.body.data ? JSON.parse(req.body.data) : {}
			const { receiver_id , chat_id, content } = parsedData
			const file = req.file
			console.log('Parsed data:', parsedData);
			
			const sender_id = req.user.id 
			const newMessage = await messagesService.createMessage(
				sender_id,
				receiver_id,
				chat_id,
				content,
				file
			)

			const receiverSocketId = getReceiverSocketId(receiver_id)
			console.log('Receiver socket ID:', receiverSocketId)

			if (receiverSocketId) {
				console.log('Emitting newMessage to receiver:', receiverSocketId)
				req.io.to(receiverSocketId).emit('newMessage', newMessage)
			} else {
				console.log('Receiver not connected, skipping WebSocket emission')
			}

			return res.status(201).json(newMessage)
		} catch (error) {
			next(error)
		}
	}

	async getMessages(req, res) {
		try {
			console.log('Request params:', req.params);
			
			const userToChatId = req.params.userToChatId
			const myId = req.user.id
			const messages = await messagesService.getMessages(userToChatId, myId)
			console.log('Retrieved messages:', messages);
			if (!messages) {
				return res.status(404).json({ error: 'Messages not found' })
			}
			return res.status(200).json(messages)
		} catch (error) {
			console.log('Error retrieving messages:', error);
			return res.status(500).json({ error: error.message })
		}
	}
}

module.exports = new MessagesController()
