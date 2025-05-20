import React, { useState } from 'react'
import Input from '../input'
import type { User } from '../../types/api.types/user.types'
import api from '../../api'

export default function Search() {
  const [query, setQuery] = useState<string>('')
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    console.log('Start search');
    
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
		handleSearch() // Можно добавить задержку (debounce) для оптимизации
	}

  return (
		<div>
			<Input
				type='text'
				value={query}
				onChange={handleInputChange}
				placeholder='Search users...'
			/>
			{loading && <p>Loading...</p>}
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<ul>
				{users.map(user => (
					<li key={user.id}>
						{user.username} ({user.email})
					</li>
				))}
			</ul>
		</div>
	)
}
