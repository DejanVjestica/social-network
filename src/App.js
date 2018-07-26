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
        console.log("inside app.js, componentDidMount");
        this.props.dispatch(getLogedUser());
    }
    // Profile image component  -----------------
    showUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }
    setImage() {
        this.setState({
            uploaderIsVisible: false
        });
    }
    // ___________________________________________
    // Profile component --------------------
    showSetBio() {
        this.setState({
            setBioIsVisible: !this.state.setBioIsVisible
        });
    }
    setBio(bio) {
        this.setState({
            bio: bio,
            setBioIsVisible: false
        });
    }

    // ---------------------------------------------
    render() {
        if (!this.props.logedUser || !this.props.logedUser.id) {
            return <div>Loading</div>;
        }
        return (
            <BrowserRouter>
                <div id="app" className="">
                    {/* ------------- NAVBAR ----------------------- */}
                    <div className="w3-top">
                        <div className="w3-bar w3-blue-grey w3-left-align w3-large">
                            <NavBar />
                        </div>
                    </div>
                    {/* ------------ MAIN CONTENT ------------------- */}
                    <div id="content" className="">
                        {/* ------------------ Sidebar --------------------- */}
                        <div className="w3-third w3-light-blue w3-animate-left">
                            <div className="w3-container w3-display-container w3-margin-bottom w3-margin-top">
                                {/* ----------- Profile avatar ----------------- */}
                                <div
                                    className="w3-col w3-margin-right"
                                    style={{ width: 20 + "px" }}
                                >
                                    <ProfilePic
                                        className=""
                                        whenClick={this.showUploader}
                                    />
                                </div>
                                {/* ----------- link to edit profile ----------------- */}
                                <Link to="/profile" className="w3-rest">
                                    <div className="w3- w3-large">
                                        {this.props.logedUser.first}{" "}
                                        {this.props.logedUser.last}
                                    </div>
                                </Link>
                            </div>
                            {/* ----------------- Sidebar menu -------------- */}
                            <div className="">
                                <div className="w3-coll w3-bar-block w3-blue">
                                    <Link to="/friends">
                                        <button className="w3-bar-item w3-button">
                                            Friends
                                        </button>
                                    </Link>
                                    <Link to="/chat">
                                        <button className="w3-bar-item w3-button">
                                            Chats
                                        </button>
                                    </Link>
                                    <Link to="/online">
                                        <button className="w3-bar-item w3-button">
                                            Online Users
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* ------------- Main content ----------------------- */}
                        <div className="w3-rest w3-white w3-padding">
                            <Route
                                path="/profile"
                                render={() => (
                                    <Profile
                                        setBioIsVisible={
                                            this.state.setBioIsVisible
                                        }
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
                            {this.state.uploaderIsVisible && (
                                <div className="w3-modal w3-white w3-container ">
                                    <Uploader setImage={this.setImage} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
const mapStateToProps = state => {
    return {
        logedUser: state.logedUser && state.logedUser
    };
};
export default connect(mapStateToProps)(App);
