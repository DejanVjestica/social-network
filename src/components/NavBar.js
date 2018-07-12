import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProfilePic from "./ProfilePic";

class NavBar extends Component {
    componentDidMount() {}
    render() {
        return (
            <React.Fragment>
                <a href="/" className="w3-bar-item w3-text-white ">
                    <i className="fa fa-home w3-margin-right" />Pet book
                </a>
                {location.pathname == "/welcome" && (
                    <Link
                        to="/login"
                        className="w3-bar-item w3-button w3-padding w3-right"
                    >
                        Login
                    </Link>
                )}
                {location.pathname != "/welcome" && (
                    <React.Fragment>
                        <div className="w3-bar-item image-small w3-right ">
                            <ProfilePic />
                        </div>
                        <a href="/logout" className="w3-bar-item w3-right ">
                            Logout
                        </a>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}
export default NavBar;
