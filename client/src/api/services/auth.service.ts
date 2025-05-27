import type { AxiosResponse } from 'axios'
import type { AuthResponse } from '../../types/api.types/response/auth.response'
import api from '..'
import UserService from './user.service'

export default class AuthService {
	static async login(
		email: string,
		password: string
	): Promise<AxiosResponse<AuthResponse>> {
		return api.post<AuthResponse>(`/user/login`, { email, password })
	}

	static async registration(
		name: string,
		surname: string,
		email: string,
		password: string
	): Promise<AxiosResponse<AuthResponse>> {
		return api.post<AuthResponse>('/user/registration', {
			name,
			surname,
			email,
			password,
		})
	}

	static async updateUser(formData: FormData) {
		return UserService.updateUser(formData)
	}

	static async logout(): Promise<void> {
		return api.post('/user/logout')
	}
}
