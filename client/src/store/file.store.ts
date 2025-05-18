import { makeAutoObservable, runInAction } from "mobx"
import FileService from "../api/services/file.service"

class FileStore {
	avatarUrl: string | undefined | null = null
	isLoading: boolean = false
	error: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	async fetchAvatar(avatar: string) {
		this.isLoading = true
		this.error = null
		try {
			const url = await FileService.getAvatar(avatar)
			runInAction(() => {
				this.avatarUrl = url
				this.isLoading = false
			})
      
		} catch (error) {
			runInAction(() => {
				this.error = error instanceof Error ? error.message : 'Unknown error'
				this.isLoading = false
			})
		}
	}

	reset() {
		if (this.avatarUrl && this.avatarUrl.startsWith('blob:')) {
			URL.revokeObjectURL(this.avatarUrl) // Очистка Blob URL
		}
		this.avatarUrl = null
		this.isLoading = false
		this.error = null
	}
}


export const fileStore = new FileStore()