import { Outlet } from 'react-router'
import { useAuthRedirect } from '../../hooks/useAuthRedirect/useAuthRedirect'

export default function Layout() {
  useAuthRedirect()

  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  )
}
