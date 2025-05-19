import { io, Socket } from 'socket.io-client'
import type { User } from '../../types/api.types/user.types'

export type SocketEvents = {
	// Типы событий сокета
	'message:new': (message: { id: string; text: string; userId: string }) => void
	'file:uploaded': (file: { id: string; url: string; name: string }) => void
	'user:updated': (user: User) => void
	'users:online': (userIds: string[]) => void
	'users:get': () => void
  'say:hello': (message: string) => void
}

class SocketService {
	private isConnected = false
	private static instance: SocketService
	socket: Socket<SocketEvents> | null = null

	private constructor() {} // Приватный конструктор для синглтона

	public static getInstance(): SocketService {
		if (!SocketService.instance) {
			SocketService.instance = new SocketService()
		}
		return SocketService.instance
	}

	public init(userId: number) {
		if (this.socket) return

		this.socket = io('http://localhost:5000', {
			query: { userId },
			transports: ['websocket'],
		})

		this.setupConnectionHandlers()
	}

	private setupConnectionHandlers() {
		if (!this.socket) return

		this.socket.on('connect', () => {
			this.isConnected = true
			console.log('✅ Socket connected')
		})

		this.socket.on('disconnect', () => {
			this.isConnected = false
			console.log('❌ Socket disconnected')
		})
	}
	public on<T extends keyof SocketEvents>(event: T, callback: SocketEvents[T]) {
		this.socket?.on(event, callback as any) 
	}

	public off<T extends keyof SocketEvents>(event: T) {
		this.socket?.off(event)
	}

	public emit<T extends keyof SocketEvents>(
		event: T,
		...args: Parameters<SocketEvents[T]>
	) {
		this.socket?.emit(event, ...args)
	}

	public disconnect() {
		if (this.socket) {
			this.socket.disconnect()
			this.socket = null
		}
	}
}

export const socketService = SocketService.getInstance()
