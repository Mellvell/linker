export default interface Message {
	message_id: number
	sender_id: number
	receiver_id: number
	content: string
	file_url: string | null
	sent_at: string
	is_read: boolean
}