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
        // console.log("img is cliked");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
        // this.props.dispatch(getLogedUser());

        console.log("show uploader:", this.props.logedUser.image);
    }
    setImage() {
        // console.log("inside set image", singleimage);
        this.setState({
            // image: image,
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
        if (!this.props.logedUser || !this.props.logedUser.id) {
            return <div>Loading</div>;
        }
        // console.log(this.props.logedUser);
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
                        {/* -------------------------------------------------- */}
                        <div className="w3-col m3 w3-light-blue w3-container w3-padding-24 w3-animate-left">
                            <div className="w3-col">
                                {/* ----------- Profile component ----------------- */}
                                <ProfilePic
                                    whenClick={this.showUploader}
                                    // image={this.props.logedUser.image}
                                    // setBioIsVisible={this.state.setBioIsVisible}
                                />
                                {/* ----------- link to name ----------------- */}
                                <Link
                                    to="/profile"
                                    className="w3-cell-row w3-margin-bottom"
                                >
                                    <div className=" ">
                                        {this.props.logedUser.first}{" "}
                                        {this.props.logedUser.last}
                                    </div>
                                </Link>
                            </div>
                            {/* <div>{this.props.logedUser.bio}</div> */}
                            {/* ------------------------------------------------- */}
                            <div className="">
                                <div className="w3-bar-block w3-blue">
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
                                <div className="">{/* <Search /> */}</div>
                            </div>
                        </div>
                        {/* ------------- Routes ----------------------- */}
                        <div className="w3-col m6 w3-container w3-pale-yellow">
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
                        </div>
                    </div>
                    {/* ------------- SIDEBAR ----------------------- */}

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
