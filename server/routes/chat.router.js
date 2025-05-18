const chatRouter = require('express').Router()
const chatController = require('../controllers/chat.controller')
const authMiddleware = require('../middleware/auth.middleware')

chatRouter.post('/create', authMiddleware, chatController.createChat)
chatRouter.get('/chats', authMiddleware, chatController.getChats)

module.exports = chatRouter
