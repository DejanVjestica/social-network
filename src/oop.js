import React from "react";
import axios from "./axios";
import FriendButton from "./friendButton";

class OtherPersonProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.updateFriendshipStatus = this.updateFriendshipStatus.bind(this);
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        // console.log("opp.js comp.", this.props.match.params.id);
        axios.get(`/users/${id}.json`).then(({ data }) => {
            // console.log("opp.js comp.did mount:", data);
            // if (data.redirectToProfil) {
            //     return this.props.history.push("/");
            // }
            this.setState({
                id: data.id,
                first: data.first,
                last: data.last,
                image: data.image,
                bio: data.bio
            });
        });
    }

    render() {
        // if (!this.state.id) {
        //     return null;
        // }
        return (
            <div id="opp">
                <p>
                    {this.state.first} {this.state.last}
                </p>
                {/* {this.state.first} {this.state.last} */}
                <p>{this.state.bio}</p>

                <img src={this.state.image} />
                <FriendButton
                    otherUserID={this.props.match.params.id}
                    // updateFriendship={this.updateFriendshipStatus}
                />
            </div>
        );
    }
}
export default OtherPersonProfile;
