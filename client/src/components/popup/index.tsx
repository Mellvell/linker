import React, { useState, type ReactNode } from 'react'
import styles from './styles.module.scss'

import type PopupProps from './popup.types'

export default function Popup({popupName, children, classNamePopupName}: PopupProps)  {
  const [isOpen, setIsOpen] = useState<boolean>(false)

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
			<div className={styles.popupNameWrapper}>
				<p
					onClick={togglePopup}
					className={`${styles.popupName} ${classNamePopupName}`}
				>
					{popupName}
				</p>
			</div>
			{isOpen && (
				<div className={styles.popupOverlay} onClick={handleOverlayClick}>
					<div className={styles.popupContent}>{children}</div>
				</div>
			)}
		</div>
	)
}
