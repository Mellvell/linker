import { makeAutoObservable } from 'mobx'
import ChatService from '../api/services/chat.service'
import type Chat from '../types/api.types/chat.types'
import type { User } from '../types/api.types/user.types'
import UserService from '../api/services/user.service'
import { userStore } from './user.store'
import { authStore } from './auth.store'

export default class ChatStore {
	chats: Chat[] = []
	interlocutor = {} as User
	isLoading = false

	constructor() {
		makeAutoObservable(this)
	}

	setInterlocutor(user: User) {
		this.interlocutor = user
	}
	setChats(chats: Chat[]) {
		this.chats = chats
	}

	addChat(chat: Chat) {
		this.chats.push(chat)
	}

	setIsLoading(loading: boolean) {
		this.isLoading = loading
	}

	async getUser(userId: string) {
		try {
			const response = await UserService.getUser(userId)
			if (response) {
				this.setInterlocutor(response.data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	async getChats() {
		try {
			const response = await ChatService.getChats()
			this.setChats(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	async deleteChat(chatId: number, receiverId: number) {
		this.setIsLoading(true)
		try {
			const response = await ChatService.deleteChat(chatId, receiverId)
			console.log(response)

			// Удаляем чат из массива chats
			this.setChats(this.chats.filter(chat => chat.chat_id !== chatId))
			userStore.getUsersForContactList(authStore.user.id) // Обновляем контакты после удаления чата
			this.setIsLoading(false)
		} catch (error) {
			console.error(error)
			this.setIsLoading(false)
			throw error
		}
	}

	async createChats(receiverId: string): Promise<{
		chat_id: number
		user1_id: number
		user2_id: number
		created_at: string
	}> {
		this.setIsLoading(true)
		try {
			const response = await ChatService.createChat(receiverId)
			console.log(response)

			this.addChat(response)
			this.setIsLoading(false)
			return response
		} catch (error) {
			console.error(error)
			this.setIsLoading(false)
			throw error
		}
	}
}

export const chatStore = new ChatStore()
