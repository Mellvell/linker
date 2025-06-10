import { useContext, useState } from "react"
import type ChatHeaderProps from "./ChatHeader.type"
import { observer } from "mobx-react-lite"
import { Context } from "../../../../main"
import { useTranslation } from "react-i18next"
import styles from './styles.module.scss'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import Avatar from "../../../avatar"
import Button from "../../../button"

export default observer(function ChatHeader({selectedUser, chatId, setSelectedContact}: ChatHeaderProps) {
  const {userStore, chatStore, socketStore} = useContext(Context)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslation('chat')

  const handleDeleteChat = async () => {
		try {
			await chatStore.deleteChat(chatId, selectedUser.id)
			setIsMenuOpen(false)
			userStore.setContacts(
				userStore.contacts.filter(contact => contact.chatId !== chatId)
			)
			setSelectedContact(null)
		} catch (error) {
			console.error('Error deleting chat:', error)
		}
	}

  return (
		<div className={styles.chatHeader}>
			<div className={styles.userInfo}>
				<Avatar avatar={selectedUser.avatar} maxWidth='50px' />
				<div>
					<h5>{selectedUser.name}</h5>
					<p
						className={
							socketStore.onlineUserIds.includes(String(selectedUser.id))
								? styles.online
								: styles.status
						}
					>
						{socketStore.onlineUserIds.includes(String(selectedUser.id))
							? t('status_online')
							: t('status_offline')}
					</p>
				</div>
			</div>
			<div className={styles.chatMenu}>
				<Button
					type='button'
					className={styles.menuButton}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					<MoreVertIcon />
				</Button>
				{isMenuOpen && (
					<div className={styles.dropdownMenu}>
						<button
							type='button'
							className={styles.menuItem}
							onClick={handleDeleteChat}
						>
							{t('delete_chat')}
						</button>
					</div>
				)}
			</div>
		</div>
	)
})
