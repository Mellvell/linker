import styles from './styles.module.scss'
import { Link, useNavigate } from 'react-router'

import Form from '../../components/form'
import TextField from '../../components/TextField'
import Button from '../../components/button'
import { useContext, useState } from 'react'
import { Context } from '../../main'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate()

	const {authStore} = useContext(Context)

	const handleLogin = (email: string, password: string) => {
		authStore.login(email, password, navigate)
	}

	return (
		<>
			<div className={styles.loginContainer}>
				<div className={styles.rightBlock}>
					<Form className={styles.loginForm}>
						<h2 className={styles.rightHeading}>Sing In</h2>
						<TextField
							onChange={e => setEmail(e.target.value)}
							value={email}
							className={styles.textField}
							type='text'
							label='Email'
						/>
						<TextField
							onChange={e => setPassword(e.target.value)}
							value={password}
							className={styles.textField}
							type='password'
							label='Password'
						/>
						<div className={styles.buttonLogin}>
							<Button type='button' onClick={() => handleLogin(email, password)} className={styles.loginButton}>
								Sing In
							</Button>
						</div>
					</Form>
				</div>
				<div className={styles.leftBlock}>
					<div className={styles.leftText}>
						<div>
							<h1>
								Welcome to <span>LINKER</span>.
							</h1>
						</div>
						<div>
							<p>
								Don't have an account?
								<Link className={styles.link} to={'/registration'}>
									{' '}
									Sign up.
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
