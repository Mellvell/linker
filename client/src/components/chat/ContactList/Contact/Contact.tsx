import styles from './styles.module.scss'
import type ContactProps from './contact.types'
import Avatar from '../../../avatar'
import { useTranslation } from 'react-i18next'


export default function Contact({
	id,
	name,
	isOnline = true,
	avatar,
	onClick,
}: ContactProps) { 
	const { t } = useTranslation('contact')
	return (
		<div id={`${id}`} className={styles.contactItems} onClick={onClick}>
			<div>
				<Avatar avatar={avatar} maxWidth='50px' />
			</div>
			<div>
				<h4 className={styles.contactHeading}>{name}</h4>
				<p className={`${styles.status} ${isOnline ? styles.Active : ''}`}>
					{isOnline ? t('status_online') : t('status_offline')}
				</p>
			</div>
		</div>
	)
}
