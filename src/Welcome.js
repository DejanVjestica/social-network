import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import NavBar from "./components/NavBar";

// component ---------------------------
class Welcome extends Component {
    render() {
        return (
            <HashRouter>
                <React.Fragment>
                    <div className="w3-top">
                        <div className="w3-bar w3-blue-grey w3-left-align w3-large">
                            <NavBar />
                        </div>
                    </div>
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
