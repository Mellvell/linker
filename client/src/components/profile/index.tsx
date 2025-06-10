import { useContext, useState } from 'react'
import { Context } from '../../main'
import Avatar from '../avatar'
import styles from './style.module.scss'
import Button from '../button'
import { useTranslation } from 'react-i18next'
import Popup from '../popup'

export default function Profile() {
	const [isOpen, setIsOpen] = useState(false)
	const { authStore } = useContext(Context)
	const { t } = useTranslation('profile')
	const [isLoading, setIsLoading] = useState(false)

	const [formData, setFormData] = useState({
		name: authStore.user.name,
		surname: authStore.user.surname,
		username: authStore.user.username,
		email: authStore.user.email,
		avatar: null, 
	})

	// Обработчик изменения полей формы
	const handleInputChange = (e: { target: { name: any; value: any; files: any } }) => {
		const { name, value, files } = e.target
		setFormData(prev => ({
			...prev,
			[name]: files ? files[0] : value,
		}))
	}

	// Обработчик отправки формы
	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()
		try {
			setIsLoading(true)
			const formDataToSend = new FormData()
			formDataToSend.append('name', formData.name)
			formDataToSend.append('surname', formData.surname)
			formDataToSend.append('username', formData.username)
			formDataToSend.append('email', formData.email)
			if (formData.avatar) {
				formDataToSend.append('avatar', formData.avatar)
			}

			await authStore.updateUser(formDataToSend)
			setIsOpen(false) 
			setIsLoading(false)
		} catch (error) {
			console.error('Ошибка при обновлении профиля:', error)
		}
	}

	return (
		<div className={styles.profileWrapper}>
			<div className={styles.profileTop}>
				<h3 className={styles.profileTitle}>{t('title')}</h3>
			</div>
			<div className={styles.profileUser}>
				<Avatar avatar={authStore.user.avatar} maxWidth='90px' />
				<div className={styles.userText}>
					<h3 className={styles.userTitle}>
						{authStore.user.name} {authStore.user.surname}
					</h3>
					<p className={styles.userEmail}>{authStore.user.email}</p>
				</div>
			</div>
			<div className={styles.profileInfo}>
				<div className={styles.profileInfoItems}>
					<p>{t('name')}: </p>
					<p>{authStore.user.name}</p>
				</div>
				<div className={styles.profileInfoItems}>
					<p>{t('surname')}: </p>
					<p>{authStore.user.surname}</p>
				</div>
				<div className={styles.profileInfoItems}>
					<p>{t('username')}: </p>
					<p>{authStore.user.username}</p>
				</div>
				<div className={styles.profileInfoItems}>
					<p>{t('email')}: </p>
					<p>{authStore.user.email}</p>
				</div>
			</div>
			<div className={styles.profileButtonWrap}>
				<Button type='button' onClick={() => setIsOpen(true)}>
					{t('change_info')}
				</Button>
			</div>
			<Popup isOpen={isOpen} className={isLoading ? styles.popup : ''} setIsOpen={setIsOpen}>
				<form onSubmit={handleSubmit} className={styles.editForm}>
					<h3>{t('edit_profile')}</h3>
					<div className={styles.formGroup}>
						<label htmlFor='avatar'>{t('avatar')}</label>
						<input
							type='file'
							id='avatar'
							name='avatar'
							accept='image/*'
							onChange={handleInputChange}
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor='name'>{t('name')}</label>
						<input
							type='text'
							id='name'
							name='name'
							value={formData.name}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor='surname'>{t('surname')}</label>
						<input
							type='text'
							id='surname'
							name='surname'
							value={formData.surname}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor='username'>{t('username')}</label>
						<input
							type='text'
							id='username'
							name='username'
							value={formData.username}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor='email'>{t('email')}</label>
						<input
							type='email'
							id='email'
							name='email'
							value={formData.email}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className={styles.formButtons}>
						<Button type='submit'>{t('save')}</Button>
						<Button type='button' onClick={() => setIsOpen(false)}>
							{t('cancel')}
						</Button>
					</div>
				</form>
			</Popup>
		</div>
	)
}
