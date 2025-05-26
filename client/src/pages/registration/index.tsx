import React, { useContext, useState } from 'react'
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
	const { t } = useTranslation('registration')

	const { authStore } = useContext(Context)	

	const navigate = useNavigate()

	const handleRegistration = (name: string, surname: string, email: string, password: string) => {
		authStore.registration(name, surname, email, password, navigate)
	}

	return (
		<>
			<div className={styles.registerWrap}>
				<div className={styles.rightBlock}>
					<Form className={styles.registerForm}>
						<h2 className={styles.registerHeading}>{t('title')}</h2>
						<TextField
							onChange={e => setName(e.target.value)}
							value={name}
							className={styles.input}
							type='text'
							label={t('name_label')}
						/>
						<TextField
							onChange={e => setSurname(e.target.value)}
							value={surname}
							className={styles.input}
							type='text'
							label={t('surname_label')}
						/>
						<TextField
							onChange={e => setEmail(e.target.value)}
							value={email}
							className={styles.input}
							type='text'
							label={t('email_label')}
						/>
						<TextField
							onChange={e => setPassword(e.target.value)}
							value={password}
							className={styles.input}
							type='password'
							label={t('password_label')}
						/>
						<div className={styles.registerButtonWrap}>
							<Button
								type='button'
								onClick={() =>
									handleRegistration(name, surname, email, password)
								}
								className={styles.registerButton}
							>
								{t('button_sign_up')}
							</Button>
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
		</>
	)
}
