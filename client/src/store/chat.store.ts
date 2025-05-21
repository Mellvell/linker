import { makeAutoObservable, set } from "mobx"
import ChatService from "../api/services/chat.service"
import type Chat from "../types/api.types/chat.types"
import type { User } from "../types/api.types/user.types"
import UserService from "../api/services/user.service"

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

	setIsLoading(loading: boolean){
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

	async createChats(receiverId: string) {
    this.setIsLoading(true)
		try {
			const response = await ChatService.createChat(receiverId)
      console.log(response);

			this.addChat(response)
      this.setIsLoading(false)
		} catch (error) {
			console.error(error)
		}
	}
}


export const chatStore = new ChatStore()
