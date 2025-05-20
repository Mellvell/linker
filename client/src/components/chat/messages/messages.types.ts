import type MessageProps from './message/message.type'
import type Message from '../../../types/api.types/messages.type'

export default interface MessagesProps {
	messages: Message[]
}