const { Server } = require('socket.io')

const socketToUserMap = new Map()

const sendOnlineUsers = io => {
	const onlineUsers = Array.from(socketToUserMap.keys())
	io.emit('users:online', onlineUsers)
}

const initSocket = server => {
	const io = new Server(server, {
		cors: {
			origin: process.env.CLIENT_URL,
			credentials: true,
		},
	})

	io.on('connection', socket => {
		try {
			const userId = socket.handshake.query.userId			
			if (!userId) {
				console.log('Socket connection rejected: No userId provided')
				socket.disconnect()
				return
			}

			socketToUserMap.set(userId, socket.id)
			console.log(`User connected: ${socket.id}, userId: ${userId}`)
			sendOnlineUsers(io)

			socket.on('users:get', () => {
				sendOnlineUsers(io)
			})

			socket.emit('say:hello', 'Hello from server!')

			socket.on('disconnect', () => {
				socketToUserMap.delete(userId)
				console.log(`User disconnect: ${socket.id}`)
				sendOnlineUsers(io)
			})

			socket.on('error', error => {
				console.error('Socket error:', error)
			})
		} catch (error) {
			console.error('Error in socket connection handler:', error)
			socket.disconnect()
		}
	})



	return io
}

const getReceiverSocketId = userId => {
	return socketToUserMap.get(`${userId}`)
}

module.exports = { initSocket, getReceiverSocketId }
