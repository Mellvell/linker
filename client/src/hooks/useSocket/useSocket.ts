import { useEffect } from 'react'
import { socketService } from '../../api/services/socket.service'
import type { SocketEvents } from '../../api/services/socket.service'

export const useSocket = <T extends keyof SocketEvents>(
	event: T,
	callback: Parameters<typeof socketService.on<T>>[1]
) => {
	useEffect(() => {
		socketService.on(event, callback)

		return () => {
			socketService.off(event)
		}
	}, [event, callback])
}
