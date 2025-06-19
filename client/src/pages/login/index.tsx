import styles from './styles.module.scss'
import { Link, useNavigate } from 'react-router'
import Form from '../../components/form'
import TextField from '../../components/TextField'
import Button from '../../components/button'
import { useTranslation } from 'react-i18next'
import { useContext, useState } from 'react'
import { Context } from '../../main'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { t } = useTranslation('login')
	const navigate = useNavigate()
	const { authStore } = useContext(Context)

	const handleLogin = (email: string, password: string) => {
		authStore.login(email, password, navigate)
	}

	return (
		<div className={styles.loginContainer}>
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
				<Form className={styles.loginForm}>
					<h2 className={styles.rightHeading}>{t('title')}</h2>
					<TextField
						onChange={e => setEmail(e.target.value)}
						value={email}
						className={styles.textField}
						type='text'
						label={t('email_label')}
					/>
					<TextField
						onChange={e => setPassword(e.target.value)}
						value={password}
						className={styles.textField}
						type='password'
						label={t('password_label')}
					/>
					<div className={styles.buttonLogin}>
						<Button
							type='button'
							onClick={() => handleLogin(email, password)}
							className={styles.loginButton}
						>
							{t('button_sign_in')}
						</Button>
					</div>
					<div className={styles.registerLink}>
						<p>
							{t('no_account')}
							<Link className={styles.link} to='/registration'>
								{' '}
								{t('sign_up_link')}
							</Link>
						</p>
					</div>
				</Form>
			</div>
			<div className={styles.leftBlock}>
				<div className={styles.leftText}>
					<div>
						<h1 dangerouslySetInnerHTML={{ __html: t('welcome_message') }} />
					</div>
					<div>
						<p>
							{t('no_account')}
							<Link className={styles.link} to='/registration'>
								{' '}
								{t('sign_up_link')}
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
