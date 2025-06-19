import { useState, useContext } from "react";
import type MessageFormProps from "./MessageFrom.types";
import styles from './styles.module.scss'
import { Context } from "../../../../main";
import { useTranslation } from "react-i18next";

import AttachFileIcon from '@mui/icons-material/AttachFile'
import Input from "../../../input";
import Button from "../../../button";

const MessageForm = ({
	chatId,
	selectedUser,
	setSelectedFile,
	setPreviewUrl,
	setPopupText,
	setIsPopupOpen,
}: MessageFormProps) => {
	const { messageStore } = useContext(Context)
	const [textMessage, setTextMessage] = useState('')
	const { t } = useTranslation('chat')

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!textMessage.trim()) return

		try {
			await messageStore.sendMessage({
				chat_id: chatId,
				receiver_id: selectedUser.id,
				content: textMessage,
			})
			setTextMessage('')
		} catch (error) {
			console.error('Failed to send message:', error)
		}
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setSelectedFile(file)
			const url = URL.createObjectURL(file)
			setPreviewUrl(url)
			setIsPopupOpen(true)
		}
	}

	return (
		<form className={styles.messageForm} onSubmit={handleSendMessage}>
			<Input
				className={styles.messageInput}
				type='text'
				placeholder={t('input_messages_placeholder')}
				value={textMessage}
				onChange={e => setTextMessage(e.target.value)}
			/>
			<label htmlFor='file' className={styles.selectFileLabel}>
				<AttachFileIcon />
				<input
					id='file'
					type='file'
					className={styles.selectFile}
					onChange={handleFileChange}
				/>
			</label>
			<Button className={styles.messageButton} type='submit'>
				{t('button_message')}
			</Button>
		</form>
	)
}

export default MessageForm