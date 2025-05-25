const routerMessage = require('express').Router();
const authMiddleware = require('../middleware/auth.middleware');
const MessagesController = require('../controllers/messages.controller');
const upload = require('../middleware/multer.middleware');

routerMessage.post(
	'/sendMessage',
	authMiddleware,
	upload.single('file'),
	MessagesController.sendMessage
)
routerMessage.get('/getMessages/:userToChatId', authMiddleware, MessagesController.getMessages);

module.exports = routerMessage;

