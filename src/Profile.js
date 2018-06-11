import React from "react";
// import ProfilePic from "./ProfilePic";
import axios from "./axios";

import ProfilePic from "./ProfilePic";
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
        // console.log(e.target.value);
    }
    uploadBio() {
        // e.preventDefault();
        // console.log("before axios insige uploadImage", this.textarea);
        axios
            .post("/uploadbio", {
                bio: this.textarea
            })
            .then(({ data }) => {
                this.props.setBio(data.bio);
                // console.log("Inside uploadBio profile.js: ", this.bio);
                // this.props.closeBio();
            });
    }
    render() {
        return (
            <div>
                <ProfilePic image={this.props.image} />
                <h1>
                    Welcome {this.props.first} {this.props.last}
                </h1>

                <p>{this.props.bio}</p>

                {this.props.setBioIsVisible && (
                    <div>
                        <input
                            type="textarea"
                            name="textarea"
                            className=""
                            onChange={this.inputTextArea}
                        />
                        <button onClick={this.uploadBio}>
                            Submit{/* {this.props.bio ? "Edit" : "Add your bio now"} */}
                        </button>
                    </div>
                )}

                {!this.props.setBioIsVisible && (
                    <button onClick={this.props.showSetBio}>
                        Add your bio now
                        {/* {this.props.setBioIsVisible
                            ? "Close"
                            : "Add your bio now"} */}
                    </button>
                )}
            </div>
        );
    }
}
export default Profile;
