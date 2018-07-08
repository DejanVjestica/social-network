import React from "react";
// import Profile from "./Profile";
// import { Component } from "react";
// import { Component } from "react-ovject";
// import Uploader from "./Uploader";

class ProfilePic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        // console.log("ProfilePic.js render profile image: ", this.props.image);
        return (
            <div className="mr-3 mt-3 rounded-circle">
                {!this.props.image && (
                    <img
                        src="/images/default-profile-picture.jpg"
                        onClick={this.props.whenClick}
                    />
                )}
                {this.props.image && (
                    <img
                        src={this.props.image}
                        onClick={this.props.whenClick}
                    />
                )}
            </div>
        );
    }
}
export default ProfilePic;
