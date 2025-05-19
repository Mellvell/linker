const messagesService = require('../services/messages.service');
const { getReceiverSocketId } = require('../socket/socket')
const { io } = require('../index')

class MessagesController {
  async sendMessage(req, res) {
    try {
      const { receiverId, chatId, message } = req.body;
      const senderId = req.user.id; // Assuming you have user ID in req.user
      const file = req.file; // Assuming you are using multer for file upload
      const newMessage = await messagesService.createMessage(senderId, receiverId, chatId, message, file);

      if (!newMessage) {
        return res.status(400).json({ error: 'Message creation failed' });
      }

      const receiverSocketId = getReceiverSocketId(receiverId);
      if (!receiverSocketId) {
        io.to(receiverSocketId).emit('newMessage', newMessage);
      }

      return res.status(201).json(newMessage);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getMessages(req, res) {
    try {
      const userToChatId = req.params.userToChatId;
      const myId = req.user.id; // Assuming you have user ID in req.user
      const messages = await messagesService.getMessages(userToChatId, myId);

      if (!messages) {
        return res.status(404).json({ error: 'Messages not found' });
      }
      return res.status(200).json(messages);
    }
    catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new MessagesController();
