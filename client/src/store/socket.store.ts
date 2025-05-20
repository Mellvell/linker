import { action, makeAutoObservable } from "mobx"
import { socketService } from "../api/services/socket.service"
import { messageStore } from "./message.store"

class SocketStore {
	onlineUserIds: string[] = []
	isSocketReady = false

	constructor() {
		makeAutoObservable(this)
	}

	setOnlineUserIds(userIds: string[]) {
		this.onlineUserIds = userIds
	}

	setSocketReady(ready: boolean) {
		this.isSocketReady = ready
	}

	init(userId: number) {
		socketService.off('users:online')
		socketService.off('newMessage')

		socketService.init(userId)
		socketService.on('users:online', (userIds: string[]) => {
			console.log('SocketStore: received online users', userIds)
			this.setOnlineUserIds(userIds)
			this.setSocketReady(true)
		})

		socketService.on('newMessage', (message: { id: number; senderid: number; receiverid: number; message: string; fileurl: string | null; createdat: string }) => {
			console.log('SocketStore: received new message', message)
			messageStore.addMessage(message)
		})
	}
}

export const socketStore = new SocketStore()
export default SocketStore
