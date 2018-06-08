// import React from "react";
import React, { Component } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import axios from "axios";

import Logo from "./logo";
import ProfilePic from "./ProfilePic";
import Profile from "./Profile";
import Uploader from "./Uploader";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "",
            last: "",
            userid: "",
            image: "",
            bio: "",
            uploaderIsVisible: false
        };
        this.setImage = this.setImage.bind(this);
        this.showUploader = this.showUploader.bind(this);
    }
    componentDidMount() {
        axios
            .get("/user")
            .then(({ data }) => {
                console.log("componentDidMount data", data);
                // console.log(this.state.firstName, this.state.lastName);
                this.setState(
                    {
                        first: data.first,
                        last: data.last,
                        userid: data.id,
                        image: data.image
                    },
                    () => {
                        console.log(
                            "componentDidMount state",
                            this.state.image
                        );
                    }
                );
            })
            .catch(function(err) {
                console.log(err);
            });
    }
    showUploader() {
        console.log("img is cliked");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }
    setImage(singleimage) {
        console.log("inside set image", singleimage);
        this.setState({
            image: singleimage,
            uploaderIsVisible: false
        });
    }
    inputFile(e) {
        this.file = e.target.files[0];
    }
    // upload(e) {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append("file", this.file);
    //     axios.post("/upload", formData).then(({ data }) => {
    //         this.props.setImage(data);
    //     });
    // }
    // setBio() {}
    render() {
        return (
            <BrowserRouter>
                <div id="app">
                    <header>
                        <Logo />
                        {/* <h2>Pet book</h2> */}
                        <ProfilePic
                            whenClick={this.showUploader}
                            image={this.state.image}
                        />
                    </header>
                    <Link to="/profile">See your profile</Link>
                    <Route
                        path="/profile"
                        render={() => (
                            <Profile
                                userId={this.state.id}
                                first={this.state.first}
                                last={this.state.last}
                                image={this.state.image}
                                // bio={this.state.bio}
                                // setBio={this.setBio},
                                showUploader={this.state.showUploader}
                            />
                        )}
                    />
                    {/* <Route exact path="/profile" component={Profile} /> */}
                    {/* <Route exact path="/profile" component={Profile} /> */}
                    {this.state.uploaderIsVisible && (
                        <Uploader setImage={this.setImage} />
                    )}
                </div>
            </BrowserRouter>
        );
    }
}
export default App;

//
// class App extends React.Component {
// 	constructor() {
// 		this.showUploader
// 	}
// 	componentDidMount(){
// 		axios.get("/user").then(({data}) =>{
// 			this.setState({
// 				first:data.first,
// 				last:data.last,
// 				profilePic: data.profilePic,
// 				id:data.id
// 			})
// 		})
// 	}
// 	showUploader(){
// 		this.setState({uploaderIsVisible:true})
// 	}
// 	render(){
// 		if (!this.state.id) {
// 			return null;
// 		} return(
// 			<div id="app"><Logo /></div>
// 			<ProfilePic
// 				url={this.state.profilePic}
// 				onClick={this.showUploader}
// 			/>
// 			{this.state.uploaderIsVisible && <Uploader />}
// 		)
// 	}
// }
//
//
// //----------------------
// <img src
