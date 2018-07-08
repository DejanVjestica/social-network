// react --------------------------------
import React, { Component } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
// redux ----------------------------
import { connect } from "react-redux";
import { getLogedUser } from "./actions.js";

// import component -----------------------
import NavBar from "./components/NavBar";

import ProfilePic from "./components/ProfilePic";
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
            uploaderIsVisible: false,
            setBioIsVisible: false
        };
        this.setImage = this.setImage.bind(this);
        this.showUploader = this.showUploader.bind(this);
        this.setBio = this.setBio.bind(this);
        this.showSetBio = this.showSetBio.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(getLogedUser());
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
                    <div className="w3-top">
                        <div className="w3-bar w3-blue-grey w3-left-align w3-large">
                            <NavBar />
                        </div>
                    </div>

                    {/* ------------- sidebar ----------------------- */}
                    <div className="">
                        <Link to="/profile" className="">
                            <ProfilePic
                                className=""
                                whenClick={this.showUploader}
                                image={this.state.image}
                                // setBioIsVisible={this.state.setBioIsVisible}
                            />
                            <p className="">
                                {this.state.first} {this.state.last}
                            </p>
                        </Link>

                        <div className="">
                            <Link to="/friends">
                                <button className="">Friends</button>
                            </Link>
                            <Link to="/chat">
                                <button className="">Chats</button>
                            </Link>
                            <Link to="/online">
                                <button className="">Online Users</button>
                            </Link>
                            <a className="" href="/logout">
                                Logout
                            </a>
                        </div>
                        <div className="">{/* <Search /> */}</div>
                    </div>
                    {/* ------------- Routes ----------------------- */}
                    <div className="">
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

                    {this.state.uploaderIsVisible && (
                        <Uploader setImage={this.setImage} />
                    )}
                </div>
            </BrowserRouter>
        );
    }
}
const mapStateToProps = state => {
    return {
        // type: state.type,
        logedUser: state.logedUser && state.logedUser
    };
};
export default connect(mapStateToProps)(App);
