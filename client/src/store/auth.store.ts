import { makeAutoObservable } from 'mobx'
import type { User } from '../types/api.types/user.types'
import AuthService from '../api/services/auth.service'
import axios from 'axios'
import type { AuthResponse } from '../types/api.types/response/auth.response'

const API_URL = import.meta.env.VITE_API_URL

class AuthStore {
	user = {} as User
	isAuth = false
	isReady = false
	isLoading = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	setAuth(bool: boolean) {
		this.isAuth = bool
	}

	setUser(user: User) {
		this.user = user
	}

	setIsLoading(bool: boolean) {
		this.isLoading = bool
	}

	setError(error: string | null) {
		this.error = error
	}

	setIsReady(bool: boolean) {
		this.isReady = bool
	}

	async login(
		email: string,
		password: string,
		navigate: (path: string) => void
	) {
		this.setIsLoading(true)
		this.setError(null)
		try {
			const response = await AuthService.login(email, password)
			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
			navigate('/')
		} catch (error) {
			this.setError(error instanceof Error ? error.message : 'Login failed')
			throw error
		} finally {
			this.setIsLoading(false)
		}
	}

	async registration(
		name: string,
		surname: string,
		email: string,
		password: string,
		navigate: (path: string) => void
	) {
		this.setIsLoading(true)
		this.setError(null)
		try {
			const response = await AuthService.registration(
				name,
				surname,
				email,
				password
			)
			localStorage.setItem('token', response.data.accessToken)

			this.setAuth(true)
			this.setUser(response.data.user)
			navigate('/')
		} catch (error) {
			this.setError(
				error instanceof Error ? error.message : 'Registration failed'
			)
			throw error
		} finally {
			this.setIsLoading(false)
		}
	}

	async logout() {
		this.setIsLoading(true)
		this.setError(null)
		try {
			await AuthService.logout()
			localStorage.removeItem('token')
			this.setAuth(false)
			this.setUser({} as User)
		} catch (error) {
			this.setError(error instanceof Error ? error.message : 'Logout failed')
		} finally {
			this.setIsLoading(false)
		}
	}

  async checkAuth() {
    this.setIsLoading(true);
    this.setError(null);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/user/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setIsReady(true);
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'Auth check failed');
      this.setIsReady(true);
    } finally {
      this.setIsLoading(false);
    }
  }
}

export const authStore = new AuthStore()
export default AuthStore
