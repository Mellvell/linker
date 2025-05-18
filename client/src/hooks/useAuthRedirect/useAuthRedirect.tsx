import { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { Context } from '../../main'

export function useAuthRedirect() {
	const { store } = useContext(Context)
	const isRequestSent = useRef(false)
	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem('token')

		if (!token) {
			navigate('/login')
			return
		}

		if (!isRequestSent.current) {
			isRequestSent.current = true
			store.checkAuth().then(() => {
				if (!store.isAuth) {
					navigate('/login')
				} else {
					store.getUsersForContactList(store.user.id).then(() => {
					navigate('/')
					})
				}
			})
		}
	}, [])
}
