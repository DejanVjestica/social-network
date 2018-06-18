import { getSocket } from "./socket";
const socket = getSocket();

class CHat extends React.Component(){
	componentDidUpdate(){
		this.elem.scrollTop = this.elem.scrollHeight - this.elem.
	}
	let val;
	<textarea onChange={ e => val = e.target.value}/>
	<button onClick={e => socket.emit("chatMessage",val )}/>

	<div ref={elem => this.elem = elem} id="chat">
		this.props.messages.map(
			msg => <div key={}></div>
		)
	</div>
}

// dateformating
let d =new Date("")
console.log(
	d.toLocaleDateStrin(),
	d.getDate(),
	d.getMonth(),

)
