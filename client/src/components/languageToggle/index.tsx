import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './styles.module.scss'

const LanguageToggle: React.FC = () => {
	const { i18n } = useTranslation()

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng)
	}

	const isRussian = i18n.language === 'ru'

	return (
		<div className={styles.languageToggle}>
			<button
				className={`${styles.toggleButton} ${
					isRussian ? styles.activeLeft : ''
				}`}
				onClick={() => changeLanguage('ru')}
			>
				Русский
			</button>
			<button
				className={`${styles.toggleButton} ${
					!isRussian ? styles.activeRight : ''
				}`}
				onClick={() => changeLanguage('en')}
			>
				English
			</button>
		</div>
	)
}

export default LanguageToggle
