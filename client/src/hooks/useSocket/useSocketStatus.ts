import { useState, useEffect } from 'react'
import { socketService } from '../../api/services/socket.service'

export const useSocketStatus = () => {
	const [isConnected, setIsConnected] = useState(socketService.connected)

	useEffect(() => {
		const onConnect = () => setIsConnected(true)
		const onDisconnect = () => setIsConnected(false)

		// Подписываемся на события сокета
		socketService.socket?.on('connect', onConnect)
		socketService.socket?.on('disconnect', onDisconnect)

		// Очищаем подписки при размонтировании
		return () => {
			socketService.socket?.off('connect', onConnect)
			socketService.socket?.off('disconnect', onDisconnect)
		}
	}, [])

	return isConnected
}
