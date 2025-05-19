import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'

import { authStore } from './store/auth.store.ts'
import { userStore } from './store/user.store.ts'
import { socketStore } from './store/socket.store.ts'

import AuthStore from './store/auth.store.ts'
import UserStore from './store/user.store.ts'
import SocketStore from './store/socket.store.ts'

interface IStore {
	authStore: AuthStore,
	userStore: UserStore,
	socketStore: SocketStore
}

export const Context = createContext<IStore>({
	authStore,
	userStore,
	socketStore
})

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Context.Provider value={{ authStore, userStore, socketStore }}>
			<App />
		</Context.Provider>
	</StrictMode>
)
