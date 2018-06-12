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
        // this.updateFriendshipStatus = this.updateFriendshipStatus.bind(this);
    }
    componentDidMount() {
        // const id = this.props.match.params.id;
        const id = this.props.otherUserID;
        console.log("friend button comp mounted resipient_id is: ", id);
        console.log("friend button comp mounted sender_id is: ");
        axios
            .get(`/friendships/${id}.json`)
            .then(({ data }) => {
                console.log("inside then:", data.statusResult.rows);
                // console.log("friends button inside axios", otherUserID);
                //
                this.setState({
                    status: data.statusResult.rows[0].status,
                    recipientId: data.statusResult.rows[0].recipientid
                });
                console.log("then comp did mount", this.state.status);
            })
            .catch(function(err) {
                console.log("friend button catch", err);
            });
    }
    getButtonText() {
        const { status, recipientId } = this.state;
        // console.log("get button", status, recipientId);
        if (status == 1) {
            console.log(status, recipientId);
            if (recipientId == this.props.otherUserId) {
                return "Cancel Friend Request";
            } else {
                return "Accept Request";
            }
        } else if (status == 2) {
            return "End Friendship";
        } else {
            return "Send friend request";
        }
    }
    // updateFriendshipStatus() {
    //     console.log("friend button is clicked");
    // }
    render() {
        // if (!this.state.status) {
        //     return null;
        // }
        return (
            <div>
                <button onClick={this.props.updateFriendship}>
                    {this.getButtonText()}
                </button>
            </div>
        );
    }
}
export default friendButton;
