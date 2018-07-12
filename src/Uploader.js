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
                // console.log("inside upload", data);
                // this.props.setImage(data);
                this.props.dispatch(getLogedUser());
            })
            // .then(function(data) {})
            .catch(function(err) {
                console.log("uploader inside aploader catch: ", err);
            });
    }
    // componentDidMount() {
    // }
    render() {
        return (
            <div className="uploader">
                {/* {!this.state.uploaderIsVisible && <Uploader />} */}
                <h1>Do you want to change your Profile image?</h1>
                <input
                    type="file"
                    name="file"
                    className="file"
                    onChange={this.inputFile}
                />
                <button onClick={this.upload}>Upload</button>
            </div>
        );
    }
}
const mapStateToProps = () => {
    return {
        // logedUser: state.logedUser && state.logedUser
    };
};
export default connect(mapStateToProps)(Uploader);
