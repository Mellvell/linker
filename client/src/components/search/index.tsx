import React, { useState, useEffect, useContext } from 'react'
import Input from '../input'
import type { User } from '../../types/api.types/user.types'
import styles from './styles.module.scss'
import api from '../../api'
import { useTranslation } from 'react-i18next'
import SearchUserCard from './searchUserCard/searchUserCard'
import SearchSkeleton from './searchSekeleton/searchSkeleton'
import Popup from '../popup'
import { Context } from '../../main'
import Avatar from '../avatar'

export default function Search() {
	const [query, setQuery] = useState<string>('')
	const [users, setUsers] = useState<User[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [isSearching, setIsSearching] = useState<boolean>(false)
	const [showResults, setShowResults] = useState<boolean>(false)
	const [selectedUser, setSelectedUser] = useState<User | null>(null)
	const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)
	const { t } = useTranslation('search')
	const { authStore, userStore, chatStore, setSelectedContact } = useContext(Context)

	useEffect(() => {
		const hasQuery = !!query.trim()
		setIsSearching(hasQuery)
		setShowResults(hasQuery)
	}, [query])

	const handleSearch = async () => {
		if (!query.trim()) {
			setUsers([])
			setError(null)
			return
		}

		setLoading(true)
		setError(null)

		try {
			const response = await api.get('/user/getSearchUser', {
				params: { query },
			})
			setUsers(response.data)
		} catch (err: any) {
			if (
				err.response?.status !== 400 ||
				err.response?.data?.message !== 'Пользователь не найден'
			) {
				setError(t('search_error_message'))
			}
			setUsers([])
		} finally {
			setLoading(false)
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value)
		handleSearch()
	}

	const handleUserClick = (user: User) => {
		setSelectedUser(user)
		setIsPopupOpen(true)
	}

	const handleCreateChat = async () => {
		if (selectedUser && setSelectedContact) {
			try {
				const chat = await chatStore.createChats(selectedUser.id.toString())

				await userStore.getUsersForContactList(authStore.user.id)

				setSelectedContact({
					user: selectedUser,
					chatId: chat.chat_id, 
				})

				setIsPopupOpen(false)
				setSelectedUser(null)
			} catch (err) {
				console.error('Error creating chat:', err)
			}
		}
	}

	return (
		<div className={styles.searchContainer}>
			<div className={styles.inputWrap}>
				<Input
					className={styles.searchInput}
					type='text'
					value={query}
					onChange={handleInputChange}
					placeholder={t('search_input_placeholder')}
				/>
			</div>

			{showResults && (
				<div className={styles.resultsWrapper}>
					<div className={styles.resultsList}>
						{loading ? (
							<SearchSkeleton />
						) : users.length > 0 ? (
							users.map(user => (
								<SearchUserCard
									key={user.id}
									id={user.id}
									avatar={user.avatar}
									name={user.name}
									surname={user.surname}
									username={user.username}
									onClick={() => handleUserClick(user)}
								/>
							))
						) : (
							<div className={styles.placeholder}>
								{t('search_no_users_message')}
							</div>
						)}
					</div>
				</div>
			)}

			{selectedUser && (
				<Popup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} popupName=''>
					<div className={styles.userPopupContent}>
						<Avatar avatar={selectedUser.avatar} maxWidth='100px' />
						<h3>
							{selectedUser.name} {selectedUser.surname}
						</h3>
						<p>@{selectedUser.username}</p>
						<div className={styles.popupButtons}>
							<button
								onClick={handleCreateChat}
								className={styles.messageButton}
							>
								Написать сообщение
							</button>
							<button
								onClick={() => {
									setIsPopupOpen(false)
									setSelectedUser(null)
								}}
								className={styles.cancelButton}
							>
								Отменить
							</button>
						</div>
					</div>
				</Popup>
			)}
		</div>
	)
}
