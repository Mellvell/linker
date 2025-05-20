const routerMessage = require('express').Router();
const authMiddleware = require('../middleware/auth.middleware');
const MessagesController = require('../controllers/messages.controller');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' }) 

routerMessage.post(
	'/sendMessage',
	authMiddleware,
	upload.single('file'),
	MessagesController.sendMessage
)
routerMessage.get('/getMessages/:userToChatId', authMiddleware, MessagesController.getMessages);

module.exports = routerMessage;

