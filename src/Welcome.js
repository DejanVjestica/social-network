import React, { Component } from "react";
import { HashRouter, Route, Link } from "react-router-dom";
// import { HashRouter, Route, Link }from
import Register from "./register";
import Login from "./login";
// import Logo from "./logo";
// import { Link } from "react-router-dom";

class Welcome extends Component {
    render() {
        return (
            <div>
                <header>{/* <Logo /> */}</header>
                <HashRouter>
                    <div>
                        {/* <Link to="/">Home</Link> */}
                        {location.pathname != "/login" && (
                            <Link to="/login">Login</Link>
                        )}
                        <Route exact path="/" component={Register} />
                        <Route path="/login" component={Login} />
                    </div>
                </HashRouter>
                {/* <h2>Welcome to</h2> */}
                <h2>Pet book</h2>
                <p>Get to know felow camarades</p>
            </div>
        );
    }
}
export default Welcome;
