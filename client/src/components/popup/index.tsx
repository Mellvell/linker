import React, { type ReactNode } from 'react'
import styles from './styles.module.scss'
import type PopupProps from './popup.types'

export default function Popup({
	popupName,
	children,
	classNamePopupName,
	isOpen,
	setIsOpen,
}: PopupProps) {
	const togglePopup = () => {
		setIsOpen(!isOpen)
	}

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			setIsOpen(false)
		}
	}

	return (
		<div className={styles.popupContainer}>
			{popupName ? (
				<div className={styles.popupNameWrapper}>
					<p
						onClick={togglePopup}
						className={`${styles.popupName} ${classNamePopupName}`}
					>
						{popupName}
					</p>
				</div>
			) : null}
			{isOpen && (
				<div className={styles.popupOverlay} onClick={handleOverlayClick}>
					<div className={styles.popupContent}>{children}</div>
				</div>
			)}
		</div>
	)
}
