import React from 'react'
import styles from './styles.module.scss'
import type PopupProps from './popup.types'

export default function Popup({
	popupName,
	children,
	className,
	isOpen,
	setIsOpen,
}: PopupProps) {
	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			setIsOpen(false)
		}
	}

	return (
		<div className={styles.popupContainer}>
			{popupName && (
				<div className={styles.popupNameWrapper}>
					<p
						onClick={() => setIsOpen(!isOpen)}
						className={`${styles.popupName}`}
					>
						{popupName}
					</p>
				</div>
			)}
			{isOpen && (
				<div className={styles.popupOverlay} onClick={handleOverlayClick}>
					<div className={`${styles.popupContent} ${className}`}>{children}</div>
				</div>
			)}
		</div>
	)
}
