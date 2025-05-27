import LanguageToggle from '../../components/languageToggle'
import { ThemeToggle } from '../../components/themeToggle'
import styles from './styles.module.scss'

export default function Settings() {
  return (
		<div className={styles.settingsContainer}>
			<div className={styles.settingsWrapper}>
				<h1 className={styles.settingsTitle}>Настройки</h1>
				<div className={styles.settingsSection}>
					<h2 className={styles.sectionTitle}>Язык</h2>
					<div className={styles.optionGroup}>
						<p>Выберете язык</p>
						<LanguageToggle />
					</div>
				</div>
				<div className={styles.settingsSection}>
					<h2 className={styles.sectionTitle}>Тема</h2>
					<div className={styles.optionGroup}>
						<ThemeToggle />
					</div>
				</div>
				<div className={styles.settingsSection}>
					<h2 className={styles.sectionTitle}>Информация</h2>
					<div className={styles.infoItem}>Версия: 1.0.0</div>
					<div className={styles.infoItem}>Разработчик: Linker Team</div>
					<div className={styles.infoItem}>© 2025 Linker</div>
				</div>
				<div className={styles.settingsSection}>
					<button className={styles.actionButton}>Удалить профиль</button>
					<button className={styles.logoutButton}>Выйти</button>
				</div>
			</div>
		</div>
	)
}
