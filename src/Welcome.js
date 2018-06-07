import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
// import { HashRouter, Route, Link }from
import Register from "./register";
import Login from "./login";
// import Logo from "./logo";
// import { Link } from "react-router-dom";

class Welcome extends Component {
    render() {
        return (
            <div>
                <header>
                    <h2>Pet book</h2>
                    {/* <Logo /> */}
                </header>
                <p>Get to know felow camarades</p>
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Register} />
                        <Route path="/login" component={Login} />
                        {/* <Link to="/">Home</Link> */}
                        {/* {location.pathname != "/welcome/login" && (
                            <Link to="/login">Login</Link>
                        )} */}
                    </div>
                </HashRouter>
            </div>
        );
    }
}
export default Welcome;
