import { useContext, useState } from 'react'
import { Context } from '../../main'
import Avatar from '../avatar'
import styles from './style.module.scss'
import Button from '../button'
import { useTranslation } from 'react-i18next'

export default function Profile() {
	const [cheng, setCheng] = useState(false)
	const { authStore } = useContext(Context)
	const { t } = useTranslation('profile')

	const chengInfo = () => {
		setCheng(!cheng)
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
				<Button type='button' onClick={chengInfo}>
					Change info
				</Button>
			</div>
		</div>
	)
}
