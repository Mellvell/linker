import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import Avatar from '../avatar'
import styles from './style.module.scss'
import Button from '../button'
import Input from '../input'

export default function Profile() {
	const [cheng, setCheng] = useState(false)
	const { authStore } = useContext(Context)

	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')

	const chengInfo = () => {
		setCheng(!cheng)
	}

	return (
		<div className={styles.profileWrapper}>
			<div className={styles.profileTop}>
				<h3 className={styles.profileTitle}>Profile</h3>
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
					<p>Name: </p>
					{cheng ? (
						<Input
							type='text'
							placeholder='Name'
							onChange={e => setName(e.target.value)}
							value={name}
						/>
					) : (
						<p>{authStore.user.name}</p>
					)}
				</div>
				<div className={styles.profileInfoItems}>
					<p>Surname: </p>
					{cheng ? (
						<Input type='text' placeholder='surname' />
					) : (
						<p>{authStore.user.surname}</p>
					)}
				</div>
				<div className={styles.profileInfoItems}>
					<p>Username: </p>
					{cheng ? (
						<Input type='text' placeholder='Username' />
					) : (
						<p>{authStore.user.username}</p>
					)}
				</div>
				<div className={styles.profileInfoItems}>
					<p>Email: </p>
					{cheng ? (
						<Input type='text' placeholder='Email' />
					) : (
						<p>{authStore.user.email}</p>
					)}
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
