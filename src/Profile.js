import React from "react";
import { connect } from "react-redux";
import { getLogedUser } from "./actions.js";

import axios from "./axios";
import ProfilePic from "./components/ProfilePic";

class Profile extends React.Component {
    constructor(props) {
        super(props);
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
                this.props.dispatch(getLogedUser());
            });
    }
    render() {
        return (
            <React.Fragment>
                <div className="w3-large ">Your profile </div>
                <div className="">
                    <ProfilePic
                        whenClick={this.props.whenClick}
                        image={this.props.image}
                    />
                </div>
                <h1>
                    Welcome {this.props.logedUser.first}{" "}
                    {this.props.logedUser.last}
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
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        logedUser: state.logedUser && state.logedUser
    };
};
export default connect(mapStateToProps)(Profile);
