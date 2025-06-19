import React, { useContext, useState } from 'react'
import styles from './styles.module.scss'
import type ChatProps from './chat.type'
import Messages from '../messages/Messages'
import Input from '../../input'
import Button from '../../button'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import ChatSkeleton from '../Skeleton/chatSkeleton/ChatSkeleton'
import Popup from '../../popup'
import { useTranslation } from 'react-i18next'
import ChatHeader from './ChatHeader/ChatHeader'
import MessageForm from './MessageForm/MessageForm'
import FilePreviewPopup from './FilePreviewPopup/FilePreviewPopup'

const Chat = observer(({ selectedUser, chatId, setSelectedContact }: ChatProps) => {
	const { authStore, messageStore } = useContext(Context)
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const [popupText, setPopupText] = useState('')
	const [isPopupOpen, setIsPopupOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const { t } = useTranslation('chat')

	const dialogMessages = (messageStore.messages || []).filter(
		msg =>
			(msg.sender_id === authStore.user.id &&
				msg.receiver_id === selectedUser.id) ||
			(msg.sender_id === selectedUser.id &&
				msg.receiver_id === authStore.user.id)
	)

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log('File Change');
		const file = e.target.files?.[0]
		if (file) {
			setSelectedFile(file)
			const url = URL.createObjectURL(file)
			setPreviewUrl(url)
			setIsPopupOpen(true)
			console.log('Open', isPopupOpen)
		}

	}

	const handleSendWithFile = async () => {
		if (!selectedFile && !popupText.trim()) return
		setIsLoading(true)

		try {
			const messageData = {
				chat_id: chatId,
				receiver_id: selectedUser.id,
				content: popupText || ' ',
				file: selectedFile,
			}
			await messageStore.sendMessage(messageData)
			setIsLoading(false)
			setSelectedFile(null)
			setPreviewUrl(null)
			setPopupText('')
			setIsPopupOpen(false)
		} catch (error) {
			console.error('Failed to send message with file:', error)
		}
	}

	if (messageStore.isLoading) return <ChatSkeleton />
	if (messageStore.error) return <div>Error: {messageStore.error}</div>

	return (
		<div className={styles.chat}>
			<ChatHeader
				selectedUser={selectedUser}
				setSelectedContact={setSelectedContact}
				chatId={chatId}
			/>
			<Messages messages={dialogMessages} />
			<MessageForm
				chatId={chatId}
				selectedUser={selectedUser}
				setSelectedFile={setSelectedFile}
				setPreviewUrl={setPreviewUrl}
				setPopupText={setPopupText}
				setIsPopupOpen={setIsPopupOpen}
			/>
			<FilePreviewPopup
				isOpen={isPopupOpen}
				setIsOpen={setIsPopupOpen}
				selectedFile={selectedFile}
				previewUrl={previewUrl}
				popupText={popupText}
				setPopupText={setPopupText}
				setSelectedFile={setSelectedFile}
				setPreviewUrl={setPreviewUrl}
				chatId={chatId}
				receiverId={selectedUser.id}
			/>
		</div>
	)
})

export default Chat
