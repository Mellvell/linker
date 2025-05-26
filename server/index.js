require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error.middleware')
const http = require('http')
const { initSocket } = require('./socket/socket')

const pool = require('./config/db')
const router = require('./routes/index.js')

const PORT = process.env.PORT || 5000
const app = express()

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
)
app.use((req, res, next) => {
	req.io = io
	next()
}) 
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)
app.use(errorMiddleware)

const server = http.createServer(app)
const io = initSocket(server)

const start = async () => {
	try {
		await pool
			.query('SELECT NOW()')
			.then(res => console.log('Database connected:', res.rows[0].now))
			.catch(err => console.error('Database connection error', err.stack))

		server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
	} catch (error) {
		console.log('Server error', error.message)
		await pool.end()
		process.exit(1)
	}
}

start()

module.exports = { app, io }
