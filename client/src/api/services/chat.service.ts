import type { AxiosResponse } from 'axios'
import api from '..'
import type Chat from '../../types/api.types/chat.types'

export default class ChatService {
	static async createChat(receiverId: string): Promise<{
		chat_id: number
		user1_id: number
		user2_id: number
		created_at: string
	}> {
		const response = await api.post('/chat/create', { receiverId })
		return response.data
	}

	static async deleteChat(chatId: number, receiverId: number) {
		const response = await api.delete('/chat/delete', {
			data: { chatId, receiverId }
		})

		return response.data
	}

	static async getChats(): Promise<AxiosResponse<Chat[]>> {
		const response = await api.get('/chat/chats')
		console.log(response)

		return response
	}
}
