import React from "react";
import { connect } from "react-redux";
import { getLogedUser } from "./actions.js";

import axios from "./axios";
import ProfilePic from "./components/ProfilePic";
// import { Link } from "react-router-dom";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        // this.state{}
        this.inputTextArea = this.inputTextArea.bind(this);
        this.uploadBio = this.uploadBio.bind(this);
    }
    inputTextArea(e) {
        this[e.target.name] = e.target.value;
    }
    uploadBio() {
        axios
            .post("/uploadbio", {
                bio: this.textarea
            })
            .then(() => {
                // this.props.setBio(data.bio);
                this.props.dispatch(getLogedUser());
            });
    }
    render() {
        return (
            <div className="profile">
                <h3>Your profile details</h3>
                <ProfilePic
                    whenClick={this.props.whenClick}
                    image={this.props.image}
                />
                <h1>
                    Welcome {this.props.first} {this.props.last}
                </h1>

                <p>{this.props.logedUser.bio}</p>

                {this.props.setBioIsVisible && (
                    <div>
                        <input
                            type="textarea"
                            name="textarea"
                            className=""
                            onChange={this.inputTextArea}
                        />
                        <button onClick={this.uploadBio}>Submit</button>
                    </div>
                )}

                {!this.props.setBioIsVisible && (
                    <button onClick={this.props.showSetBio}>
                        {this.props.logedUser.bio
                            ? "Edit you bio"
                            : "Add your bio now"}
                    </button>
                )}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        // type: state.type,
        logedUser: state.logedUser && state.logedUser
    };
};
export default connect(mapStateToProps)(Profile);
