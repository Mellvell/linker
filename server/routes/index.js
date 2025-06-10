const { Router } = require('express')
const router = Router()

const userRouter = require('./user.router')
const messageRouter = require('./message.router')
const chatRouter = require('./chat.router')

router.use('/user', userRouter)
router.use('/message', messageRouter)
router.use('/chat', chatRouter)

module.exports = router
