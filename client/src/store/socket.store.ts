import { action, makeAutoObservable } from 'mobx'
import { socketService } from '../api/services/socket.service'
import { messageStore } from './message.store'

import type Message from '../types/api.types/messages.type'
import { chatStore } from './chat.store'
import { userStore } from './user.store'
import { authStore } from './auth.store'

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

		socketService.on(
			'newMessage',
			(message: Message ) => {
				console.log('SocketStore: received new message', message)
				const mappedMessage: Message = {
					message_id: message.message_id,
					sender_id: message.sender_id,
					receiver_id: message.receiver_id,
					content: message.content,
					file_url: message.file_url,
					file_name: message.file_name,
					sent_at: message.sent_at,
					is_read: message.is_read
				}
				messageStore.addMessage(mappedMessage)
			}
		)

		socketService.on('newChat', (data) => {
			// data.chatId, data.participants
  		// Проверяем, что текущий пользователь — участник
			console.log(data);
   		 	// Обновляем список чатов и контактов
   		chatStore.getChats()
    	userStore.getUsersForContactList(authStore.user.id)
		})

		socketService.on('deleteChat', (payload) => {
			console.log('SocketStore: received delete chat', payload)
			chatStore.setChats(
				chatStore.chats.filter(chat => chat.chat_id !== payload.chatId)
			)

			chatStore.getChats()
			userStore.getUsersForContactList(authStore.user.id)
		})
	}
}

export const socketStore = new SocketStore()
export default SocketStore
