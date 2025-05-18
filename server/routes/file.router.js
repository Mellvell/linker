const { Router } = require('express')
const fileController = require('../controllers/file.controller')

const fileRouter = new Router()

fileRouter.get('/avatars/:userId/:filename', fileController.getAvatar)


module.exports = fileRouter