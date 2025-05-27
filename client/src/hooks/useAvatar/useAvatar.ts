import { useState, useEffect } from 'react'
import type useAvatarType from './useAvatar.type'

const useAvatar = (avatarUrl: string): useAvatarType => {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [loaded, setLoaded] = useState<boolean>(false)

	useEffect(() => {
		if (!avatarUrl) {
			setIsLoading(false)
			return
		}

		// Сбрасываем состояние при изменении URL
		setIsLoading(true)
		setLoaded(false)
		setError(null)

		// Проверяем, загружено ли изображение
		const img = new Image()
		img.src = avatarUrl

		img.onload = () => {
			setLoaded(true)
			setIsLoading(false)
		}

		img.onerror = () => {
			setError('Failed to load image')
			setIsLoading(false)
		}

		return () => {
			img.onload = null
			img.onerror = null
		}
	}, [avatarUrl])

	return {
		avatarUrl: loaded ? avatarUrl : undefined,
		isLoading,
		error,
	}
}

export default useAvatar
