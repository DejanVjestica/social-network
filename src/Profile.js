import React from "react";
// import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

// import react, { Component } from "react";
// import { Component } from "react-ovject";
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1>
                    Welcome {this.props.first} {this.props.last}
                </h1>
            </div>
        );
    }
}
export default Profile;
