import styles from './styles.module.scss'
import type ContactProps from './contact.types'
import Avatar from '../../../avatar'

export default function Contact({
	id,
	name,
	isOnline = true,
	avatar,
	onClick,
}: ContactProps) { 
	return (
		<div id={`${id}`} className={styles.contactItems} onClick={onClick}>
			<div>
				<Avatar avatar={avatar} maxWidth='50px'/>
			</div>
			<div>
				<h4 className={styles.contactHeading}>{name}</h4>
				<p className={`${styles.status} ${isOnline ? styles.Active : ''}`}>
					{isOnline ? 'Online': 'Offline'}
				</p>
			</div>
		</div>
	)
}
