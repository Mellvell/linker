import MessagesService from '../api/services/message.service'
import { makeAutoObservable, action } from 'mobx'

import type Message from '../types/api.types/messages.type'

class MessageStore {
	messages: Message[] = []
	isLoading = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	setMessages(messages: Message[]) {
		this.messages = messages
	}

	addMessage(message: Message) {
		this.messages.push(message)
	}

	setIsLoading(loading: boolean) {
		this.isLoading = loading
	}

	setError(error: string | null) {
		this.error = error
	}

	async getMessages(residerId: string): Promise<Message[] | any> {
		// Изменил тип на number
		this.setIsLoading(true)
		this.setError(null)
		try {
			console.log('MessageStore: fetching messages between', { residerId })
			const response = await MessagesService.getMessages(residerId)
			console.log('MessageStore: received response', response)

			if (response && Array.isArray(response)) {
				this.setMessages(response) // Прямое присваивание массива
				return response
			}
			return []
		} catch (error) {
			this.setError(
				error instanceof Error ? error.message : 'Failed to fetch messages'
			)
			return []
		} finally {
			this.setIsLoading(false)
		}
	}

	async sendMessage(receiverId: number, message: string, chatId: number): Promise<void> {
		this.setIsLoading(true)
		this.setError(null)
		try {
			const response = await MessagesService.sendMessage(
				receiverId,
				message,
		chatId
			)
			if (response && response.data) {
				this.addMessage(response.data)
			}
		} catch (error) {
			this.setError(
				error instanceof Error ? error.message : 'Failed to send message'
			)
		} finally {
			this.setIsLoading(false)
		}
	}
}

export const messageStore = new MessageStore()
export default MessageStore
