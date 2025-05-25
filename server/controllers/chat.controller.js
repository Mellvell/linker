const chatService = require('../services/chat.service')

class ChatController {
	async createChat(req, res, next) {
		try {
			const { receiverId } = req.body
			const senderId = req.user.id

			const newChat = await chatService.createChat(senderId, receiverId)
			res.status(201).json(newChat)
		} catch (error) {
			next(error)
		}
	}

	async getChats(req, res, next) {
		try {
			const id = req.user.id
			
			const chats = await chatService.getChats(id)
			console.log('chats', chats);
			
			res.status(200).json(chats)
		} catch (error) {
			console.log(error);
			res.status(404).json({"Message": "Missing user id"})
		}
	}
}

module.exports = new ChatController()
