import React, { useState, useEffect } from 'react'
import Input from '../input'
import type { User } from '../../types/api.types/user.types'
import styles from './styles.module.scss'
import api from '../../api'

import SearchUserCard from './searchUserCard/searchUserCard'

export default function Search() {
	const [query, setQuery] = useState<string>('')
	const [users, setUsers] = useState<User[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [isSearching, setIsSearching] = useState<boolean>(false) // Состояние для отслеживания поиска

	// Эффект для активации/деактивации поиска при изменении query
	useEffect(() => {
		setIsSearching(!!query.trim()) // Активен поиск, если query не пустой
	}, [query])

	const handleSearch = async () => {
		console.log('Start search')

		if (!query.trim()) return

		setLoading(true)
		setError(null)

		try {
			const response = await api.get('/user/getSearchUser', {
				params: { query },
			})
			setUsers(response.data)
		} catch (err) {
			setError('Failed to fetch users')
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value)
		handleSearch() // Можно добавить debounce для оптимизации
	}

	return (
		<div className={styles.searchContainer}>
			<div className={styles.inputWrap}>
				<Input
					className={styles.searchInput}
					type='text'
					value={query}
					onChange={handleInputChange}
					placeholder='Search users...'
				/>
			</div>
			{loading && <p className={styles.loading}>Loading...</p>}
			{error && <p className={styles.error}>{error}</p>}
			<div className={styles.resultsList}>
				{users.map(user => (
					<SearchUserCard
						key={user.id}
						id={user.id}
						avatar={user.avatar}
						name={user.name}
						surname={user.surname}
						username={user.username}
					/>
				))}
			</div>
		</div>
	)
}
