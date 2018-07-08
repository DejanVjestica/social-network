import React, { Component } from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";

// inline styles -----------------------
// let marginTop = {
//     margintTop: "92px"
// };
// let bg = {
//     backgroundColor: "red"
// };
// component ---------------------------
class Welcome extends Component {
    render() {
        return (
            <HashRouter>
                <React.Fragment>
                    <div className="w3-top">
                        <div className="w3-bar w3-theme-d2 w3-left-align w3-large">
                            {/* <a className="w3-bar-item w3-button w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2">
                                <i className="fa fa-bars" />
                            </a> */}
                            <a
                                href="/"
                                className="w3-bar-item w3-button w3-padding-large w3-theme-d4"
                            >
                                <i className="fa fa-home w3-margin-right" />Pet
                                book
                            </a>
                            <Link
                                to="/login"
                                className="w3-bar-item w3-button w3-padding-large w3-right"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                    {/* <p>Get to know felow camarades</p> */}
                    <div id="content" className="w3-display-container ">
                        <Route path="/login" component={Login} />
                        <Route exact path="/" component={Register} />
                    </div>
                </React.Fragment>
            </HashRouter>
        );
    }
}
export default Welcome;
