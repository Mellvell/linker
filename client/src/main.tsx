import './config/i18next/i18next.ts'
import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'

import { authStore } from './store/auth.store.ts'
import { userStore } from './store/user.store.ts'
import { socketStore } from './store/socket.store.ts'
import { messageStore } from './store/message.store.ts'
import { chatStore } from './store/chat.store.ts'

import AuthStore from './store/auth.store.ts'
import UserStore from './store/user.store.ts'
import SocketStore from './store/socket.store.ts'
import MessageStore from './store/message.store.ts'
import ChatStore from './store/chat.store.ts'

import type { User } from './types/api.types/user.types.ts'

interface IStore {
	authStore: AuthStore
	userStore: UserStore
	socketStore: SocketStore
	messageStore: MessageStore
	chatStore: ChatStore
	setSelectedContact?: React.Dispatch<
		React.SetStateAction<{
			user: User
			chatId: number
		} | null>
	>
}

export const Context = createContext<IStore>({
	authStore,
	userStore,
	socketStore,
	messageStore,
	chatStore
})

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Context.Provider value={{ authStore, userStore, socketStore, messageStore, chatStore }}>
			<App />
		</Context.Provider>
	</StrictMode>
)
