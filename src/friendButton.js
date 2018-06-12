import React from "react";
import axios from "axios";

class friendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "",
            recipientId: ""
        };
        this.getButtonText = this.getButtonText.bind(this);
    }
    componentDidMount() {
        // const id = this.props.match.params.id;
        const id = this.props.otherUserID;

        axios
            .get(`/friendships/${id}.json`)
            .then(({ data }) => {
                console.log("friends button comp.did mount", id);
                this.setState({
                    status: data.status,
                    recipientId: data.recipientId
                });
            })
            .catch(function(err) {
                console.log(err);
            });
    }
    getButtonText() {
        const { status, recipientId } = this.state;
        console.log(status, recipientId);
        if (status == 1) {
            // if (recipientId == this.props.otherUserId) {
            // } else {
            // }
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
