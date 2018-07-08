import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Search from "./search";
import ProfilePic from "./ProfilePic";

class NavBar extends Component {
    componentDidMount() {
        // console.log();
        // console.log(location.pathname);
    }
    render() {
        // let location = location;
        return (
            <React.Fragment>
                <a href="/" className="w3-bar-item w3-light-grey ">
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
                {location.pathname == "/" && (
                    <React.Fragment>
                        {/* <div className=" w3-bar-item">
                            <Search />
                        </div> */}
                        <a
                            href="/logout"
                            className="w3-bar-item w3-button w3-right "
                        >
                            Logout
                        </a>
                    </React.Fragment>
                )}
                {/* <Link
				to="/login"
				className="w3-bar-item w3-button w3-padding w3-right"
				>
				Login
			</Link> */}
            </React.Fragment>
        );
    }
}
export default NavBar;
