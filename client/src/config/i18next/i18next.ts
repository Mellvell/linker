import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enLogin from '../../assets/locales/loginLocales/en.login.translation.json'
import ruLogin from '../../assets/locales/loginLocales/ru.login.translation.json'
import enRegistration from '../../assets/locales/registrationLocales/en.registration.translation.json'
import ruRegistration from '../../assets/locales/registrationLocales/ru.registration.translation.json'

import enChat from '../../assets/locales/chatContainerLocales/chatLocales/en.chat.translation.json'
import ruChat from '../../assets/locales/chatContainerLocales/chatLocales/ru.chat.translation.json'

import enContactList from '../../assets/locales/chatContainerLocales/contactListLocales/en.contactList.translation.json'
import ruContactList from '../../assets/locales/chatContainerLocales/contactListLocales/ru.contactList.translation.json'

import enContact from '../../assets/locales/chatContainerLocales/contactLocales/en.contact.translation.json'
import ruContact from '../../assets/locales/chatContainerLocales/contactLocales/ru.contact.translation.json'

import enEmptyChat from '../../assets/locales/chatContainerLocales/emptyChatLocales/en.emptyChat.translation.json'
import ruEmptyChat from '../../assets/locales/chatContainerLocales/emptyChatLocales/ru.emptyChat.translation.json'

import enSidebar from '../../assets/locales/sidebarLocales/en.sidebar.translation.json'
import ruSidebar from '../../assets/locales/sidebarLocales/ru.sidebar.translation.json'

import enProfile from '../../assets/locales/profileLocales/en.profile.translation.json'
import ruProfile from '../../assets/locales/profileLocales/ru.profile.translation.json'

import enSearch from '../../assets/locales/searchLocales/en.search.translation.json'
import ruSearch from '../../assets/locales/searchLocales/ru.search.translation.json'

i18n
	.use(LanguageDetector) // Автоматическое определение языка
	.use(initReactI18next) // Интеграция с React
	.init({
		resources: {
			en: {
				login: enLogin,
				registration: enRegistration,
				chat: enChat,
				contactList: enContactList,
				contact: enContact,
				emptyChat: enEmptyChat,
				sidebar: enSidebar,
				profile: enProfile,
				search: enSearch
			},
			ru: {
				login: ruLogin,
				registration: ruRegistration,
				chat: ruChat,
				contactList: ruContactList,
				contact: ruContact,
				emptyChat: ruEmptyChat,
				sidebar: ruSidebar,
				profile: ruProfile,
				search: ruSearch
			},
		},
		fallbackLng: 'en', // Язык по умолчанию
		interpolation: {
			escapeValue: false, // React экранирует значения
		},
		detection: {
			order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
			lookupQuerystring: 'lng',
			lookupCookie: 'i18next',
			lookupLocalStorage: 'i18nextLng',
			caches: ['localStorage', 'cookie'],
		},
	})

export default i18n
