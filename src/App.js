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
import Chat from "./chat";

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
                <div id="app" className="row">
                    {/* ------------- header ----------------------- */}
                    <header className="appHeader row col-12 justify-content-between  no-gutters bg-primary">
                        <div className="logo col-2 align-self-center">
                            <Logo />
                        </div>
                        <div className="profileImage col-1 row align-self-center justify-content-between">
                            <Link
                                className="align-self-center text-light"
                                to="/profile"
                            >
                                {this.state.first}
                            </Link>
                            <ProfilePic
                                className="align-self-center"
                                whenClick={this.showUploader}
                                image={this.state.image}
                                // setBioIsVisible={this.state.setBioIsVisible}
                            />
                        </div>
                    </header>
                    {/* ------------- sidebar ----------------------- */}
                    <aside className="col-2 appSidebar bg-dark">
                        <Link
                            to="/profile"
                            className="sideBarUserInfo flexboxContainer text-light row"
                        >
                            <ProfilePic
                                whenClick={this.showUploader}
                                image={this.state.image}
                                className="text-light align-self-center"
                                // setBioIsVisible={this.state.setBioIsVisible}
                            />
                            <p className="align-self-center">
                                {this.state.first} {this.state.last}
                            </p>
                        </Link>

                        <div className="nav bg-light flex-column ">
                            <Link to="/friends">
                                <button className="dropdown-item">
                                    Friends
                                </button>
                            </Link>
                            <Link to="/chat">
                                <button className="dropdown-item">Chats</button>
                            </Link>
                            <Link to="/online">
                                <button className="dropdown-item">
                                    Online Users
                                </button>
                            </Link>
                            <a className="dropdown-item" href="/logout">
                                Logout
                            </a>
                        </div>
                    </aside>
                    {/* ------------- Routes ----------------------- */}
                    <div className="col-8">
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
                                    uploaderIsVisible={
                                        this.state.uploaderIsVisible
                                    }
                                    // methods ----------------
                                    whenClick={this.showUploader}
                                    setBio={this.setBio}
                                    showSetBio={this.showSetBio}
                                />
                            )}
                        />
                        <Route
                            path="/user/:id"
                            component={OtherPersonProfile}
                        />

                        <Route path="/friends" component={Friends} />
                        <Route path="/online" component={Online} />
                        <Route path="/chat" component={Chat} />
                    </div>
                    {/* <Route
                        path="/user/:id"
                        render={() => (
                            <OtherPersonProfile userId={this.state.id} />
                        )}
                    /> */}

                    {this.state.uploaderIsVisible && (
                        <Uploader setImage={this.setImage} />
                    )}
                </div>
            </BrowserRouter>
        );
    }
}
export default App;
