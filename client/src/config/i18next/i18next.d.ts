import 'i18next'

declare module 'i18next' {
	interface CustomTypeOptions {
		resources: {
			translation: {
				login: {
					title: string
					email_label: string
					password_label: string
					button_sign_in: string
					welcome_message: string
					no_account: string
					sign_up_link: string
				}
				registration: {
					title: string
					name_label: string
					surname_label: string
					email_label: string
					password_label: string
					button_sign_up: string
					welcome_message: string
					has_account: string
					sign_in_link: string
				}
			}
		}
	}
}
