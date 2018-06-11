import React from "react";
class friendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getButtonText = this.getButtonText.bind(this);
    }
    getButtonText() {
        const { status, recipientId } = this.state;
        if (status == 1) {
            if (recipientId == this.props.otherUserId) {
            } else {
            }
        } else if (status == 2) {
            return "End Friendship";
        } else if (status == 3) {
            return "Cancel Friend Request";
        } else if (status == 4) {
            return "Accept Friend Request";
        } else {
            return "make friend request";
        }
    }
    render() {
        // if (!this.state.status) {
        //     return null;
        // }
        return (
            <div>
                <button>{this.getButtonText()}</button>
            </div>
        );
    }
}
export default friendButton;
