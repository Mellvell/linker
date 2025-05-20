import type { AxiosResponse } from "axios";
import api from "..";
import type { User } from "../../types/api.types/user.types";
import ChatService from "./chat.service";

export default class UserService {
	static async updateUser(name: string, surname: string, email: string) {}

	static async getUser(
		userId: string
	): Promise<AxiosResponse<User> | undefined> {
		try {
			return await api.get<User>(`/user/getUser/${userId}`)
		} catch (error) {
			console.error(error)
			return undefined
		}
	}

	static async getUsersForContactList(
		currentUserId: number
	): Promise<AxiosResponse<{ user: User; chatId: number }[]> | undefined> {
		try {
			const chatsResponse = await ChatService.getChats()
			const chats = chatsResponse.data

			// Извлекаем userId и соответствующий chatId
			const contacts = chats
				.map(chat => {
					if (chat.user1_id === currentUserId) {
						return { userId: chat.user2_id, chatId: chat.id }
					} else if (chat.user2_id === currentUserId) {
						return { userId: chat.user1_id, chatId: chat.id }
					} else {
						console.warn(
							`Chat ${chat.id} does not involve current user ${currentUserId}`
						)
						return null
					}
				})
				.filter(item => item !== null)

			if (contacts.length === 0) {
				console.log('No user IDs found in chats')
				return undefined
			}

			// Выполняем запросы для каждого userId
			const userPromises = contacts.map(item =>
				api.get<User>(`/user/getUser/${item.userId}`).then(response => ({
					user: response.data,
					chatId: item.chatId,
				}))
			)
			const usersResponses = await Promise.all(userPromises)

			// Собираем данные пользователей с chatId
			const usersWithChatId = usersResponses.map(response => response)
			return { data: usersWithChatId } as AxiosResponse<
				{ user: User; chatId: number }[]
			>
		} catch (error) {
			console.error('Error fetching users for contact list:', error)
			return undefined
		}
	}
}