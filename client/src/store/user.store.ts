import { makeAutoObservable } from 'mobx'
import type { User } from '../types/api.types/user.types'
import UserService from '../api/services/user.service'

class UserStore {
	contacts: { user: User; chatId: number }[] = [] // Обновленный тип
	isLoading = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	setContacts(contacts: { user: User; chatId: number }[]) {
		this.contacts = contacts
	}

	setIsLoading(loading: boolean) {
		this.isLoading = loading
	}

	setError(error: string | null) {
		this.error = error
	}

	async getUsersForContactList(
		currentUserId: number
	): Promise<{ user: User; chatId: number }[] | any> {
		this.setIsLoading(true)
		this.setError(null)
		try {
			const response = await UserService.getUsersForContactList(currentUserId)
			console.log(response?.data);
			
			if (response) {
				this.setContacts(response.data)
				console.log('UserStore: received contacts', response.data.map(item => item.chatId));
				
				return response.data
			}
			return []
		} catch (error) {
			this.setError(
				error instanceof Error ? error.message : 'Failed to fetch contacts'
			)
			return []
		} finally {
			this.setIsLoading(false)
		}
	}
}

export const userStore = new UserStore()
export default UserStore
