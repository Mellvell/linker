import { useContext } from "react";
import Sidebar from '../../components/sidebar'
import { Context } from '../../main'
import ChatContainer from '../../components/chat/Index'

export default function Main() {
	const { store } = useContext(Context)

  return (
		<div>
			{/* <Sidebar />	 */}
			<ChatContainer />
		</div>
	)
}
