// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react'

type Theme = 'light' | 'dark'
type ThemeContextType = {
	theme: Theme
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	// Инициализация темы из localStorage или предпочтений системы
	const [theme, setTheme] = useState<Theme>(() => {
		if (typeof window !== 'undefined') {
			const savedTheme = localStorage.getItem('theme') as Theme
			if (savedTheme) return savedTheme

			const isDarkPreferred = window.matchMedia(
				'(prefers-color-scheme: dark)'
			).matches
			return isDarkPreferred ? 'dark' : 'light'
		}
		return 'dark' // fallback
	})

	const toggleTheme = () => {
		setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
	}

	// Сохраняем тему в localStorage и применяем к документу
	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('theme', theme)
			document.documentElement.setAttribute('data-theme', theme)
		}
	}, [theme])

	// Слушаем изменения системных предпочтений
	useEffect(() => {
		if (typeof window === 'undefined') return

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const handleChange = (e: MediaQueryListEvent) => {
			const newTheme = e.matches ? 'dark' : 'light'
			setTheme(newTheme)
		}

		mediaQuery.addEventListener('change', handleChange)
		return () => mediaQuery.removeEventListener('change', handleChange)
	}, [])

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}
