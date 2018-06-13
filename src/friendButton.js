import React from "react";
import axios from "axios";

class friendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "",
            recipientId: "",
            senderId: ""
        };
        this.getButtonText = this.getButtonText.bind(this);
        this.makeRequest = this.makeRequest.bind(this);
        this.acceptRequest = this.acceptRequest.bind(this);
        this.deleteRequest = this.deleteRequest.bind(this);
        // this.updateFriendshipStatus = this.updateFriendshipStatus.bind(this);
    }
    getButtonText(data) {
        const { status, recipientId } = data;
        // console.log("get button", status, recipientId);
        if (status == 1) {
            console.log("is is status 1", status, recipientId);
            if (recipientId == this.props.otherUserId) {
                this.setState({
                    status: data.status,
                    recipientId: data.recipientid,
                    senderId: data.senderid,
                    buttonText: "Cancel Friend Request",
                    friendButtonIsClicked: this.acceptRequest
                });
            } else {
                this.setState({
                    status: data.status,
                    recipientId: data.recipientid,
                    senderId: data.senderid,
                    buttonText: "Accept Request",
                    friendButtonIsClicked: this.acceptRequest
                });
            }
        } else if (status == 2) {
            this.setState({
                status: data.status,
                recipientId: data.recipientid,
                senderId: data.senderid,
                buttonText: "Send friend request",
                friendButtonIsClicked: this.deleteRequest
            });
        } else {
            this.setState({
                status: data.status,
                recipientId: data.recipientid,
                senderId: data.senderid,
                buttonText: "End Friendship",
                friendButtonIsClicked: this.makeRequest
            });
        }
    }
    // request making methods ---------------------
    makeRequest() {
        console.log("make request button is clicked");
    }
    acceptRequest() {
        console.log("accept request button is clicked");
    }
    deleteRequest() {
        console.log("delete request button is clicked");
    }
    // ------------------------------------------------------
    componentDidMount() {
        // const id = this.props.match.params.id;
        const id = this.props.otherUserID;
        console.log("friend button comp mounted resipient_id is: ", id);
        // console.log(
        //     "friend button comp mounted sender_id is: ",
        //     this.state.senderId
        // );
        axios
            .get(`/friendships/${id}.json`)
            .then(({ data }) => {
                console.log("inside then:", data.statusResult.rows);
                // console.log("friends button inside axios", otherUserID);
                //
                this.getButtonText(data);

                console.log("axios comp did mount status: ", this.state.status);
            })
            .catch(function(err) {
                console.log("friend button catch", err);
            });
    }
    // updateFriendshipStatus() {
    //     console.log("friend button is clicked");
    // }
    render() {
        // if (!this.state.status) {
        //     return null;
        // }
        console.log(this.state);
        return (
            <div>
                <p>Status is: {this.state.status}</p>
                <button onClick={this.state.friendButtonIsClicked}>
                    {this.state.buttonText}
                </button>
            </div>
        );
    }
}
export default friendButton;
