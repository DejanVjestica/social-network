import React from "react";
import axios from "./axios";

// import { Component } from "react";
// import { Component } from "react-ovject";
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
            .then(({ data }) => {
                console.log("inside upload", data);
                this.props.setImage(data);
            })
            // .then(function(data) {})
            .catch(function(err) {
                console.log("uploader inside aploader catch: ", err);
            });
    }
    render() {
        return (
            <div className="uploader">
                {/* {!this.state.uploaderIsVisible && <Uploader />} */}
                <h1>Do you want to change your Profile image?</h1>
                {/* <input type="file" name="file" /> */}
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
export default Uploader;
