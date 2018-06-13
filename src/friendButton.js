import React from "react";
import axios from "./axios";

class friendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "",
            recipientId: ""
        };
        this.getButtonText = this.getButtonText.bind(this);
        this.makeRequest = this.makeRequest.bind(this);
        this.acceptRequest = this.acceptRequest.bind(this);
        this.deleteRequest = this.deleteRequest.bind(this);
        // this.updateFriendshipStatus = this.updateFriendshipStatus.bind(this);
    }

    // request making methods ---------------------
    makeRequest() {
        console.log("make request button is clicked");
        axios
            .post("/makerequest", {
                recipientId: this.props.otherUserId
            })
            .then(data => {
                console.log("new data", data.data);
                this.getButtonText(data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    // -----------------------------------------------
    acceptRequest() {
        console.log("accept request button is clicked");
        axios
            .post("/requestaccepted", {
                senderId: this.state.senderId
            })
            .then(resp => {
                this.getButtonText(resp.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    deleteRequest() {
        console.log("delete request button is clicked");
        axios
            .post("/deleterequest", {
                otherUserId: this.props.otherUserId
            })
            .then(resp => {
                this.getButtonText(resp.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    getButtonText(data) {
        // console.log("this is our data: ", data);
        // const { status, recipientId: recipient_id } = data;
        const status = data.status;
        const recipientId = data.recipient_id;
        const senderId = data.sender_id;
        // console.log("get button", status, recipientId, data);
        let buttonText, friendButtonIsClicked;
        if (status == 1) {
            // console.log("is is status 1", status, recipientid);
            if (recipientId == this.props.otherUserId) {
                buttonText = "Cancel Friend Request";
                friendButtonIsClicked = this.deleteRequest;
            } else {
                buttonText = "Accept Request";
                friendButtonIsClicked = this.acceptRequest;
            }
        } else if (status == 2) {
            buttonText = "End Friendship";
            friendButtonIsClicked = this.deleteRequest;
        } else {
            buttonText = "Make Friendship";
            friendButtonIsClicked = this.makeRequest;

            // console.log("is is status 0", status, recipientid);
        }
        this.setState({
            status: status,
            recipientId: recipientId,
            senderId: senderId,
            buttonText,
            friendButtonIsClicked
        });
    }
    // ------------------------------------------------------
    componentDidMount() {
        // const id = this.props.match.params.id;
        const id = this.props.otherUserId;
        console.log("friend button comp mounted resipient_id is: ", id);
        axios
            .get(`/friendships/${id}.json`)
            .then(({ data }) => {
                console.log("inside axios", data);
                this.getButtonText(data);
            })
            .catch(function(err) {
                console.log("friend button catch:", err);
            });
    }
    render() {
        // if (!this.state.status) {
        //     return null;
        // }
        // console.log("friend button render: ", this.state);
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
