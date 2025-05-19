import { makeAutoObservable } from "mobx"
import { socketService } from "../api/services/socket.service"


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
		socketService.init(userId)
		socketService.on('users:online', (userIds: string[]) => {
			console.log('SocketStore: received online users', userIds)
			this.setOnlineUserIds(userIds)
			this.setSocketReady(true)
		})
	}
}

export const socketStore = new SocketStore()
export default SocketStore
