import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import Store from './store/store.ts'

interface IStore {
	store: Store
}

const store = new Store()

export const Context = createContext<IStore>({
	store,
})

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Context.Provider value={{ store }}>
			<App />
		</Context.Provider>
	</StrictMode>
)
