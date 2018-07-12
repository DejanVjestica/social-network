import React from "react";
import axios from "./axios";
// redux ----------------------------
import { connect } from "react-redux";
import { getLogedUser } from "./actions.js";

class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.upload = this.upload.bind(this);
        this.inputFile = this.inputFile.bind(this);
    }
    inputFile(e) {
        this.file = e.target.files[0];
    }
    upload(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", this.file);
        axios
            .post("/upload", formData)
            .then(() => {
                this.props.dispatch(getLogedUser());
            })
            .catch(function(err) {
                console.log("uploader inside aploader catch: ", err);
            });
    }
    render() {
        return (
            <React.Fragment>
                <div className="w3-large w3-margin-top w3-margin-bottom">
                    Do you want to change your Profile image?
                </div>
                <div className="">
                    <img
                        src={this.props.logedUser.image}
                        className="image-midd w3-margin-bottom"
                    />
                </div>
                <div className="">
                    <input type="file" name="file" onChange={this.inputFile} />
                    <button onClick={this.upload} className="">
                        Upload
                    </button>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        logedUser: state.logedUser && state.logedUser
    };
};
export default connect(mapStateToProps)(Uploader);
