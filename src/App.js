// import React from "react";
import React, { Component } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import axios from "axios";

import Logo from "./logo";
import ProfilePic from "./ProfilePic";
import Profile from "./Profile";
import OtherPersonProfile from "./oop";
import Uploader from "./Uploader";
import Friends from "./friends";
import Online from "./online";

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
                // console.log("componentDidMount data", data);
                // console.log(this.state.firstName, this.state.lastName);
                this.setState(
                    {
                        first: data.first,
                        last: data.last,
                        userid: data.id,
                        image: data.image,
                        bio: data.bio
                    },
                    () => {}
                );
            })
            .catch(function(err) {
                console.log(err);
            });
    }
    // Profile image component  -----------------
    showUploader() {
        // console.log("img is cliked", this.state.uploaderIsVisible);
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
        // console.log("show uploader:", this.state.uploaderIsVisible);
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
        // console.log("setBioIsVisible is cliked", this.state.setBioIsVisible);
        this.setState({
            setBioIsVisible: !this.state.setBioIsVisible
        });
    }
    setBio(bio) {
        this.setState({
            bio: bio,
            setBioIsVisible: false
        });
        // console.log("setbio button is clicked", this.state.bio);
    }

    // ---------------------------------------------
    render() {
        return (
            <BrowserRouter>
                <div id="app">
                    <header>
                        <Logo />
                        <Link to="/profile">
                            {this.state.first} {this.state.last}
                            {" loged in userId: "}
                            {this.state.userid}
                        </Link>

                        <Link to="/friends">Friends</Link>
                        <Link to="/online">Online Users</Link>
                        <a href="/logout">Logout</a>
                        <ProfilePic
                            whenClick={this.showUploader}
                            image={this.state.image}
                            // setBioIsVisible={this.state.setBioIsVisible}
                        />
                    </header>
                    <p>{this.bio}</p>

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
                                uploaderIsVisible={this.state.uploaderIsVisible}
                                // methods ----------------
                                whenClick={this.showUploader}
                                setBio={this.setBio}
                                showSetBio={this.showSetBio}
                            />
                        )}
                    />
                    {/* <Route
                        path="/user/:id"
                        render={() => (
                            <OtherPersonProfile userId={this.state.id} />
                        )}
                    /> */}
                    <Route path="/user/:id" component={OtherPersonProfile} />

                    <Route path="/friends" component={Friends} />
                    <Route path="/online" component={Online} />

                    {this.state.uploaderIsVisible && (
                        <Uploader setImage={this.setImage} />
                    )}
                </div>
            </BrowserRouter>
        );
    }
}
export default App;
