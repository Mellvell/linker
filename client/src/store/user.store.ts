import { makeAutoObservable } from 'mobx'
import type { User } from '../types/api.types/user.types'
import UserService from '../api/services/user.service'

class UserStore {
	contacts: User[] = [] 
	isLoading = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	setContacts(contacts: User[]) {
		this.contacts = contacts
	}

	setIsLoading(loading: boolean) {
		this.isLoading = loading
	}

	setError(error: string | null) {
		this.error = error
	}

	async getUsersForContactList(currentUserId: number): Promise<User[] | any> {
		this.setIsLoading(true)
		this.setError(null)
		try {
			const response = await UserService.getUsersForContactList(currentUserId)
      if( response ){
        this.setContacts(response.data)
        return response.data
      }
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
