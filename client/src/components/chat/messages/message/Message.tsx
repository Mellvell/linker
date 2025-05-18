import React from 'react'
import styles from './styles.module.scss'
import type MessageProps from './message.type'

export default function Message({ timestamp, text, id }: MessageProps) {
	return (
		<div key={id} className={styles.message}>
			<span className={styles.timestamp}>{timestamp}</span>
			<span className={styles.text}>{text}</span>
		</div>
	)
}
