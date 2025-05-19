import { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { Context } from '../../main'

export function useAuthRedirect() {
	const { authStore } = useContext(Context)
	const isRequestSent = useRef(false)
	const navigate = useNavigate()

	useEffect(() => {
		console.log('useAuthRedirect: checking auth') // Страт хука для проверки авторизации
		const token = localStorage.getItem('token')

		if (!token) {
			console.log('useAuthRedirect: no token, redirecting to /login')
			navigate('/login')
			return
		}

		if (!isRequestSent.current) {
			isRequestSent.current = true
			authStore.checkAuth().then(() => {
				console.log('useAuthRedirect: checkAuth done', {
					isAuth: authStore.isAuth,
				})
				if (!authStore.isAuth) {
					console.log(
						'useAuthRedirect: not authenticated, redirecting to /login'
					)
					navigate('/login')
				} else {
					console.log('useAuthRedirect: authenticated, redirecting to /')
					navigate('/')
				}
			})
		}
	}, [authStore, navigate])
}
