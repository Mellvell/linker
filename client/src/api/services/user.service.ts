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

	static async getUsersForContactList(currentUserId: number): Promise<
		AxiosResponse<User[]> | undefined
	> {
		try {
			const chatsResponse = await ChatService.getChats()
			const chats = chatsResponse.data

			// Извлекаем все user2_id
			const userIds = chats
				.map(chat => {
					if(chat.user1_id === currentUserId) {
						return chat.user2_id
					}else if(chat.user2_id === currentUserId) {
						return chat.user1_id
					}else{ 
						console.warn(
							`Chat ${chat.id} does not involve current user ${currentUserId}`
						)
						return undefined
					}
				})
				.filter(id => id !== undefined)

			if (userIds.length === 0) {
				console.log('No user IDs found in chats')
				return undefined
			}

			console.log(userIds);
			

			// Выполняем запросы для каждого userId
			const userPromises = userIds.map(userId =>
				api.get<User>(`/user/getUser/${userId}`)
			)
			const usersResponses = await Promise.all(userPromises)

			// Собираем данные пользователей
			const users = usersResponses.map(response => response.data)
      // console.log('Users for contact list:', users);
      
			return { data: users } as AxiosResponse<User[]> // Имитация AxiosResponse
		} catch (error) {
			console.error('Error fetching users for contact list:', error)
			return undefined
		}
	}
}