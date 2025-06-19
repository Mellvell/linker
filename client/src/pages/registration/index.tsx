import { useContext, useState } from 'react'
import styles from './styles.module.scss'
import { Link, useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import Form from '../../components/form'
import TextField from '../../components/TextField'
import Button from '../../components/button'
import { Context } from '../../main'

export default function Registration() {
	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const { t } = useTranslation('registration')
	const { authStore } = useContext(Context)
	const navigate = useNavigate()

	const handleRegistration = async (name: string, surname: string, email: string, password: string) => {
		try {
			setIsLoading(true)
			await authStore.registration(name, surname, email, password, navigate)
		} catch (error) {
			// Error is handled by authStore.error
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={styles.registerWrap}>
			<div className={styles.rightBlock}>
				<div className={styles.welcomeMessage}>
					<h1 dangerouslySetInnerHTML={{ __html: t('welcome_message') }} />
				</div>
				{authStore.error && (
					<div className={styles.errorContainer}>
						<div className={styles.errorMessage}>
							{t(authStore.error) || authStore.error}
						</div>
					</div>
				)}
				{isLoading && (
					<div className={styles.loadingSpinner}>
						<div className={styles.spinner}></div>
					</div>
				)}
				<Form className={styles.registerForm}>
					<h2 className={styles.registerHeading}>{t('title')}</h2>
					<TextField
						onChange={e => setName(e.target.value)}
						value={name}
						type='text'
						label={t('name_label')}
						disabled={isLoading}
					/>
					<TextField
						onChange={e => setSurname(e.target.value)}
						value={surname}
						type='text'
						label={t('surname_label')}
						disabled={isLoading}
					/>
					<TextField
						onChange={e => setEmail(e.target.value)}
						value={email}
						type='text'
						label={t('email_label')}
						disabled={isLoading}
					/>
					<TextField
						onChange={e => setPassword(e.target.value)}
						value={password}
						type='password'
						label={t('password_label')}
						disabled={isLoading}
					/>
					<div className={styles.registerButtonWrap}>
						<Button
							type='button'
							onClick={() => handleRegistration(name, surname, email, password)}
							className={styles.registerButton}
							disabled={isLoading}
						>
							{isLoading ? t('loading') : t('button_sign_up')}
						</Button>
					</div>
					<div className={styles.loginLink}>
						<p>
							{t('has_account')}
							<Link className={styles.link} to='/login'>
								{' '}
								{t('sign_in_link')}
							</Link>
						</p>
					</div>
				</Form>
			</div>
			<div className={styles.leftBlock}>
				<div className={styles.leftText}>
					<div className={styles.leftHeadingWrap}>
						<h1 dangerouslySetInnerHTML={{ __html: t('welcome_message') }} />
					</div>
					<div>
						<p>
							{t('has_account')}
							<Link className={styles.link} to='/login'>
								{' '}
								{t('sign_in_link')}
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
