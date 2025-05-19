const routerMessage = require('express').Router();
const authMiddleware = require('../middleware/auth.middleware');
const messagesController = require('../controllers/messages.controller');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' }) 

routerMessage.post('/sendMessage', authMiddleware, upload.single('file'), messagesController.sendMessage);
routerMessage.get('/getMessages/:userToChatId', authMiddleware, messagesController.getMessages);

module.exports = routerMessage;

