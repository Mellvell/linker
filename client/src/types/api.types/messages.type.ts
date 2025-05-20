export default interface Message {
	id: number
	senderid: number
	receiverid: number
	message: string
	fileurl: string | null
	createdat: string
}