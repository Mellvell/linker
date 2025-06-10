import { NavLink } from 'react-router'
import styles from './styles.module.scss'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import { useContext, useState } from 'react'
import SidebarItems from './sidebarItems'
import { Context } from '../../main'

export default function Sidebar() {
	const { t } = useTranslation('sidebar')
	const { authStore } = useContext(Context)
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const handelLogout = () => {

	}

	return (
		<>
			<button className={styles.burgerButton} onClick={toggleMenu}>
				{isMenuOpen ? <CloseIcon /> : <MenuIcon />}
			</button>
			<aside
				className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ''}`}
			>
				<div className={styles.logo}>
					<p>Linker</p>
				</div>
				<nav className={styles.nav}>
					<SidebarItems>
						<NavLink
							to={'/profile'}
							className={({ isActive }) => (isActive ? styles.active : '')}
							onClick={() => setIsMenuOpen(false)}
						>
							<PersonOutlinedIcon /> {t('sidebar_profile')}
						</NavLink>
					</SidebarItems>
					<SidebarItems>
						<NavLink
							to={'/'}
							className={({ isActive }) => (isActive ? styles.active : '')}
							onClick={() => setIsMenuOpen(false)}
						>
							<ChatBubbleOutlineOutlinedIcon />
							{t('sidebar_chats')}
						</NavLink>
					</SidebarItems>
					<SidebarItems>
						<NavLink
							to={'/settings'}
							className={({ isActive }) => (isActive ? styles.active : '')}
							onClick={() => setIsMenuOpen(false)}
						>
							<SettingsOutlinedIcon />
							{t('sidebar_setting')}
						</NavLink>
					</SidebarItems>
				</nav>
				<SidebarItems className={styles.logout}>
					<NavLink to={'/login'} onClick={() => {
						authStore.logout()
						setIsMenuOpen(false)
					}}>
						<LogoutOutlinedIcon />
						{t('sidebar_logout')}
					</NavLink>
				</SidebarItems>
			</aside>
		</>
	)
}
