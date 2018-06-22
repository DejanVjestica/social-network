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
import Search from "./search";

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
                    <header className="navbar col-12 bg-primary text-white navbar-dark nav-bar-expand  ">
                        <div className="navbar-brand col-1 ">
                            <Logo />
                        </div>
                        {/* <div className="form-inline col-9">
                            <Search />
                        </div> */}
                        <div className="media col-1">
                            <ProfilePic
                                whenClick={this.showUploader}
                                image={this.state.image}
                                // setBioIsVisible={this.state.setBioIsVisible}
                            />
                            <Link className="media-body" to="/profile">
                                <p className="text-white">{this.state.first}</p>
                            </Link>
                        </div>
                    </header>
                    {/* ------------- sidebar ----------------------- */}
                    <aside className="col-3 appSidebar bg-secondary">
                        <Link
                            to="/profile"
                            className="row col-12 sideBarUserInfo text-light"
                        >
                            <ProfilePic
                                className="align-self-center"
                                whenClick={this.showUploader}
                                image={this.state.image}
                                // setBioIsVisible={this.state.setBioIsVisible}
                            />
                            <p className="align-self-center padding-left">
                                {this.state.first} {this.state.last}
                            </p>
                        </Link>

                        <div className="nav col-12 bg-light flex-column ">
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
                        <div className="form-inline col-9">
                            <Search />
                        </div>
                    </aside>
                    {/* ------------- Routes ----------------------- */}
                    <div className="main-content row col-9">
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
