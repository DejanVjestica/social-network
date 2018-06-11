// import React from "react";
import React, { Component } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import axios from "axios";

import Logo from "./logo";
import ProfilePic from "./ProfilePic";
import Profile from "./Profile";
// import Uploader from "./Uploader";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "",
            last: "",
            userid: "",
            image: "",
            bio: "",
            uploaderIsVisible: false,
            setBioIsVisible: false
        };
        this.setImage = this.setImage.bind(this);
        this.showUploader = this.showUploader.bind(this);
        this.setBio = this.setBio.bind(this);
        this.showSetBio = this.showSetBio.bind(this);
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
                        image: data.image,
                        bio: data.bio
                    },
                    () => {
                        console.log("componentDidMount state", this.state.bio);
                    }
                );
            })
            .catch(function(err) {
                console.log(err);
            });
        console.log("after axios comp. did mount", this.state.bio);
    }
    // Profile image component  -----------------
    showUploader() {
        // console.log("img is cliked");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }
    setImage(image) {
        // console.log("inside set image", singleimage);
        this.setState({
            image: image,
            uploaderIsVisible: false
        });
    }
    // ___________________________________________
    // Profile component --------------------
    showSetBio() {
        console.log("setBioIsVisible is cliked", this.state.setBioIsVisible);
        this.setState({
            // showSetBio: false
            setBioIsVisible: !this.state.setBioIsVisible
        });
    }
    setBio(bio) {
        //
        // axios.get("");
        this.setState({
            bio: bio
            // setBioIsVisible: false
        });
        console.log("setbio button is clicked", this.state.bio);
    }

    // ---------------------------------------------
    render() {
        return (
            <BrowserRouter>
                <div id="app">
                    <header>
                        <Logo />
                        <ProfilePic
                            whenClick={this.showUploader}
                            image={this.state.image}
                        />
                    </header>
                    <p>{this.bio}</p>

                    <Link to="/profile">See your profile</Link>
                    <Route
                        path="/profile"
                        render={() => (
                            <Profile
                                // state properties ------
                                userId={this.state.id}
                                first={this.state.first}
                                last={this.state.last}
                                bio={this.state.bio}
                                image={this.state.image}
                                setBioIsVisible={this.state.setBioIsVisible}
                                // methods ----------------
                                whenClick={this.showUploader}
                                setBio={this.setBio}
                                showSetBio={this.showSetBio}
                                // showUploader={this.state.showUploader}
                            />
                        )}
                    />
                    {/* <Route path="/user/:id" component={OtherPersonProfile} />
                    {this.state.uploaderIsVisible && (
                        <Uploader setImage={this.setImage} />
                    )} */}
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
