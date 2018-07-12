import React from "react";
import axios from "./axios";
import FriendButton from "./friendButton";

class OtherPersonProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`/users/${id}.json`).then(({ data }) => {
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
        return (
            <div>
                <FriendButton
                    otherUserId={this.props.match.params.id}
                    senderUserId={this.state.id}
                />
                <p>
                    {this.state.first} {this.state.last}
                </p>
                <p>{this.state.bio}</p>

                <img src={this.state.image} />
            </div>
        );
    }
}
export default OtherPersonProfile;
