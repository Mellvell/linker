import { useState, useEffect } from 'react'
import FileService from '../../api/services/file.service'

import type useAvatarType from './useAvatar.type'

const useAvatar = (avatar: string): useAvatarType => {
	const [avatarUrl, setAvatarUrl] = useState<string | undefined>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchAvatar = async () => {
			setIsLoading(true)
			setError(null)
			try {
				const url = await FileService.getAvatar(avatar)
				setAvatarUrl(url)
				setIsLoading(false)
			} catch (error) {
				setError(error instanceof Error ? error.message : 'Unknown error')
				setIsLoading(false)
			}
		}

		fetchAvatar()

		return () => {
			if (avatarUrl && avatarUrl.startsWith('blob:')) {
				URL.revokeObjectURL(avatarUrl) // Очистка Blob URL
			}
		}
	}, [avatar])

	return { avatarUrl, isLoading, error }
}

export default useAvatar
