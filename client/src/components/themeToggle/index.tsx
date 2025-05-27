// src/components/ThemeToggle.tsx
import { useTheme } from '../../context/themeContext'
import styles from './styles.module.scss'

export const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme()
 
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
				{theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
			</span>
		</button>
	)
}
