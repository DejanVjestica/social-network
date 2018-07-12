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
        this.elem.scrollTop = this.elem.scrollHeight;
    }
    render() {
        return (
            <div className="chat">
                <h4>Chat wall</h4>
                <div
                    className="chatMessageContainer"
                    ref={elem => {
                        this.elem = elem;
                    }}
                >
                    {this.props.chatMessages &&
                        this.props.chatMessages.map(chatMessages => {
                            return (
                                <div
                                    className="media"
                                    key={chatMessages.message_id}
                                >
                                    <img
                                        className="mr-3"
                                        src={chatMessages.image}
                                    />
                                    <div className="media-body">
                                        <h5>
                                            {chatMessages.first}{" "}
                                            {chatMessages.last}
                                        </h5>
                                        <time>{chatMessages.created_at}</time>
                                        <p>{chatMessages.message}</p>
                                    </div>
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
        chatMessages: state.chatMessages
    };
};
export default connect(mapStateToProps)(Chat);
