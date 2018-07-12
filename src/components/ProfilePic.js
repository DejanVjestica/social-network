import React from "react";
import { connect } from "react-redux";

// Redux action creator
// import { getLogedUser } from "../actions.js";

// import Profile from "./Profile";
// import { Component } from "react";
// import { Component } from "react-ovject";
// import Uploader from "./Uploader";

class ProfilePic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}
    render() {
        return (
            <React.Fragment>
                {!this.props.logedUser.image && (
                    <img
                        id="profileImg"
                        className="w3-cell"
                        src="/images/default-profile-picture.jpg"
                        onClick={this.props.whenClick}
                    />
                )}
                {this.props.logedUser.image && (
                    <img
                        id="profileImg"
                        className="w3-cell"
                        src={this.props.logedUser.image}
                        onClick={this.props.whenClick}
                    />
                )}
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        logedUser: state.logedUser && state.logedUser
    };
};
export default connect(mapStateToProps)(ProfilePic);
