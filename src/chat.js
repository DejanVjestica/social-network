import React from "react";
import { connect } from "react-redux";
import { emit } from "./socket";

class Chat extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidUpdate() {
        this.elem.scrollTop = this.elem.scrollHeight;
    }
    componentDidMount() {
        console.log("inside chats.js componentDidMount");
        this.elem.scrollTop = this.elem.scrollHeight;
    }
    render() {
        return (
            <React.Fragment>
                <div className="w3-large w3-margin-bottom">Chat wall</div>
                <div className="w3-margin-bottom">Latest posts:</div>
                <div
                    className=" w3-margin-bottom"
                    ref={elem => {
                        this.elem = elem;
                    }}
                >
                    {this.props.chatMessages &&
                        this.props.chatMessages.map(chatMessage => {
                            return (
                                <div
                                    className="w3-border w3-container w3-padding"
                                    key={chatMessage.message_id}
                                >
                                    <img
                                        className="mr-3"
                                        src={chatMessage.image}
                                    />
                                    <div className="media-body">
                                        <h5>
                                            {chatMessage.first}{" "}
                                            {chatMessage.last}
                                        </h5>
                                        <time>{chatMessage.created_at}</time>
                                        <p>{chatMessage.message}</p>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div>
                    {/* <div>testing</div> */}
                    <textarea
                        ref={elem => {
                            this.textarea = elem;
                        }}
                        name="textarea"
                        placeholder="Write a message"
                    />
                    <button
                        onClick={() => {
                            emit("newChatMessage", this.textarea.value);
                            this.textarea.value = "Write a message";
                        }}
                    >
                        Submit
                    </button>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        chatMessages: state.chatMessages
    };
};
export default connect(mapStateToProps)(Chat);
