// src/components/ThemeToggle.tsx
import { useTheme } from '../../context/themeContext'
import styles from './styles.module.scss'
import { useTranslation } from 'react-i18next'

export const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme()
	const { t } = useTranslation('toggleTheme')
	return (
		<button
			className={styles['theme-toggle']}
			onClick={toggleTheme}
			aria-label={`Переключить на ${
				theme === 'light' ? 'тёмную' : 'светлую'
			} тему`}
		>
			<span className='theme-toggle__icon'>
				{theme === 'light' ? '🌙' : '☀️'}
			</span>
			<span className='theme-toggle__text'>
				{theme === 'light' ? t('dark') : t('light')}
			</span>
		</button>
	)
}
