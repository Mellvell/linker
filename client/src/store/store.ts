import { makeAutoObservable } from 'mobx'
import type { User } from '../types/api.types/user.types'
import AuthService from '../api/services/auth.service'
import axios from 'axios'
import type { AuthResponse } from '../types/api.types/response/auth.response'
import UserService from '../api/services/user.service'

const API_URL = import.meta.env.VITE_API_URL

export default class Store {
	user = {} as User
	isAuth = false
	contacts: User[] = []

	constructor() {
		makeAutoObservable(this)
	}

	setAuth(bool: boolean) {
		this.isAuth = bool
	}

	setUser(user: User) {
		this.user = user
	}

	setContacts(contacts: User[]) {
		this.contacts = contacts
	}

	async login(
		email: string,
		password: string,
		navigate: (path: string) => void
	) {
		try {
			const response = await AuthService.login(email, password)
			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
			navigate('/')
		} catch (error) {
			if (error instanceof Error && (error as any).response?.data?.message) {
				console.log((error as any).response.data.message)
			} else {
				console.log(error)
			}
		}
	}

	async registration(
		name: string,
		surname: string,
		email: string,
		password: string,
		navigate: (path: string) => void
	) {
		try {
			const response = await AuthService.registration(
				name,
				surname,
				email,
				password
			)
			localStorage.setItem('token', response.data.accessToken)
			console.log(response)

			this.setAuth(true)
			this.setUser(response.data.user)
			navigate('/')
		} catch (error) {
			if (error instanceof Error && (error as any).response?.data?.message) {
				console.log((error as any).response.data.message)
			} else {
				console.log(error)
			}
		}
	}

	async logout() {
		try {
			await AuthService.logout()
			localStorage.removeItem('token')
			this.setAuth(false)
			this.setUser({} as User)
		} catch (error) {
			console.log(error)
		}
	}

	async checkAuth() {
		try {
			const response = await axios.get<AuthResponse>(
				`${API_URL}/user/refresh`,
				{ withCredentials: true }
			)
			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
		} catch (error) {
			console.log(error)
		}
	}

	async getUsersForContactList(currentUserId: number):Promise<User[] | any> {
		try {
			const response = await UserService.getUsersForContactList(currentUserId)
			if (response) {
				this.setContacts(response.data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	async UpdateUserInfo() {
		try {
		} catch (error) {
			console.log(error)
		}
	}
}
