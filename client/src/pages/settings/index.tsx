import LanguageToggle from '../../components/languageToggle'
import { ThemeToggle } from '../../components/themeToggle'
import styles from './styles.module.scss'
import Button from '../../components/button'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { Context } from '../../main'
import { useNavigate } from 'react-router'

export default function Settings() {
	const { t } = useTranslation('setting')
	const { authStore } = useContext(Context)
	const navigate = useNavigate()

	const handelLogout = () => {
		authStore.logout()
		navigate('/login')
	}

	return (
		<div className={styles.settingsContainer}>
			<div className={styles.settingsWrapper}>
				<h1 className={styles.settingsTitle}>{t('title')}</h1>
				<div className={styles.settingsSection}>
					<div className={styles.optionGroup}>
						<h2 className={styles.sectionTitle}>{t('langue')}</h2>
						<LanguageToggle />
					</div>
				</div>
				<div className={styles.settingsSection}>
					<div className={styles.optionGroup}>
						<h2 className={styles.sectionTitle}>{t('Theme')}</h2>
						<ThemeToggle />
					</div>
				</div>
				<div className={styles.settingsSection}>
					<h2 className={styles.sectionTitle}>{t('Information')}</h2>
					<div className={styles.infoItem}>
						{t('Information_version')}: 1.0.0
					</div>
					<div className={styles.infoItem}>
						{t('Information_developer')}: Linker Team
					</div>
					<div className={styles.infoItem}>© 2025 Linker</div>
				</div>
				<div className={styles.settingsSectionButton}>
					<Button type='button' onClick={() => handelLogout} className={styles.logoutButton}>
						{t('Logout_button')}
					</Button>
				</div>
			</div>
		</div>
	)
}
