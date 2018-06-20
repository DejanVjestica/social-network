import React from "react";
import { connect } from "react-redux";
import { emit } from "./socket";

console.log("inside chat componnent");

class Chat extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidUpdate() {
        // this.elem.scrollTop = this.elem.scrollHeight - this.elem.clientHeight;
        // console.log("test", this.elem.clientHeight);
        // console.log(this.elem.scrollHeight);
        this.elem.scrollTop = this.elem.scrollHeight;
    }
    componentDidMount() {
        this.elem.scrollTop = this.elem.scrollHeight;
    }
    render() {
        // let val;
        return (
            <div className="chat wrapper">
                <div
                    className="chatMessageContainer"
                    ref={elem => {
                        this.elem = elem;
                    }}
                >
                    {this.props.chatMessages &&
                        this.props.chatMessages.map(chatMessages => {
                            return (
                                <div className="" key={chatMessages.message_id}>
                                    <img
                                        className=""
                                        src={chatMessages.image}
                                    />
                                    <h4>
                                        {chatMessages.first} {chatMessages.last}
                                    </h4>
                                    <h5>{chatMessages.created_at}</h5>
                                    <p>{chatMessages.message}</p>
                                </div>
                            );
                        })}
                </div>
                <div>
                    <h3>testing</h3>
                    <textarea
                        ref={elem => {
                            this.textarea = elem;
                        }}
                        name="textarea"
                        placeholder="Write a message"
                    />
                    <button
                        onClick={() => {
                            emit("chatMessage", this.textarea.value);
                            this.textarea.value = "Write a message";
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // type: state.type,
        chatMessages: state.chatMessages
    };
};
export default connect(mapStateToProps)(Chat);

//
// <div ref={elem => this.elem = elem} id="chat">
// 	this.props.messages.map(
// 		msg => <div key={}></div>
// 	)
// </div>
// dateformating
// let d =new Date("")
// console.log(
// 	d.toLocaleDateStrin(),
// 	d.getDate(),
// 	d.getMonth(),
//
// )
