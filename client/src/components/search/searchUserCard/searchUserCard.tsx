import styles from './styles.module.scss'
import Avatar from '../../avatar'

interface SearchUserCard {
	id: number
	name: string
	surname: string
	username: string
	avatar: string
	onClick: () => void
}

export default function SearchUserCard({
	id,
	name,
	surname,
	username,
	avatar,
	onClick,
}: SearchUserCard) {
	return (
		<div className={styles.userCard} onClick={onClick}>
			<Avatar avatar={avatar} maxWidth='50px' />
			<div className={styles.userInfo}>
				<h5 className={styles.userFullname}>
					{name} {surname}
				</h5>
				<p className={styles.userUsername}>{username}</p>
			</div>
		</div>
	)
}
