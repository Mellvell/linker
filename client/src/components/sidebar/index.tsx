import { NavLink } from 'react-router'
import styles from './styles.module.scss'

import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import { useTranslation } from 'react-i18next'

import SidebarItems from './sidebarItems'

export default function Sidebar() {
	const { t } = useTranslation('sidebar')
	return (
		<aside className={styles.sidebar}>
			<div className={styles.logo}>
				<p>Linker</p>
			</div>
			<nav className={styles.nav}>
				<SidebarItems>
					<NavLink
						to={'/profile'}
						className={({ isActive }) => (isActive ? styles.active : '')}
					>
						<PersonOutlinedIcon /> {t('sidebar_profile')}
					</NavLink>
				</SidebarItems>
				<SidebarItems>
					<NavLink
						to={'/'}
						className={({ isActive }) => (isActive ? styles.active : '')}
					>
						<ChatBubbleOutlineOutlinedIcon />
						{t('sidebar_chats')}
					</NavLink>
				</SidebarItems>
				<SidebarItems>
					<NavLink
						to={'/settings'}
						className={({ isActive }) => (isActive ? styles.active : '')}
					>
						<SettingsOutlinedIcon />
						{t('sidebar_setting')}
					</NavLink>
				</SidebarItems>
			</nav>
			<SidebarItems className={styles.logout}>
				<NavLink to={'/logout'}>
					<LogoutOutlinedIcon />
					{t('sidebar_logout')}
				</NavLink>
			</SidebarItems>
		</aside>
	)
}
