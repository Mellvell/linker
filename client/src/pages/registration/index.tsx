import React, { useContext, useState } from 'react'
import styles from './styles.module.scss'
import { Link, useNavigate } from 'react-router'

import Form from '../../components/form'
import TextField from '../../components/TextField'
import Button from '../../components/button'
import { Context } from '../../main'

export default function Registration() {
	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { store } = useContext(Context)	

	const navigate = useNavigate()

	const handleRegistration = (name: string, surname: string, email: string, password: string) => {
		store.registration(name, surname, email, password, navigate)
	}

	return (
		<>
			<div className={styles.registerWrap}>
				<div className={styles.rightBlock}>
					<Form className={styles.registerForm}>
						<h2 className={styles.registerHeading}>Sing Up</h2>
						<TextField
							onChange={e => setName(e.target.value)}
							value={name}
							className={styles.input}
							type='text'
							label='Name'
						/>
						<TextField
							onChange={e => setSurname(e.target.value)}
							value={surname}
							className={styles.input}
							type='text'
							label='Surname'
						/>
						<TextField
							onChange={e => setEmail(e.target.value)}
							value={email}
							className={styles.input}
							type='text'
							label='Email'
						/>
						<TextField
							onChange={e => setPassword(e.target.value)}
							value={password}
							className={styles.input}
							type='password'
							label='Password'
						/>
						<div className={styles.registerButtonWrap}>
							<Button
								type='button'
								onClick={() =>
									handleRegistration(name, surname, email, password)
								}
								className={styles.registerButton}
							>
								Sing Up
							</Button>
						</div>
					</Form>
				</div>
				<div className={styles.leftBlock}>
					<div className={styles.leftText}>
						<div className={styles.leftHeadingWrap}>
							<h1 className={styles.leftHeading}>
								Welcome to <span>LINKER</span>.
							</h1>
						</div>
						<div>
							<p>
								You have an account ?
								<Link className={styles.leftLink} to={'/login'}>
									{' '}
									Sign In.
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
