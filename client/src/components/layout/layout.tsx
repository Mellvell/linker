import { Outlet } from 'react-router'
import { useAuthRedirect } from '../../hooks/useAuthRedirect/useAuthRedirect'
import Sidebar from '../sidebar'

import styles from './styles.module.scss'

export default function Layout() {
  useAuthRedirect()

  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}
