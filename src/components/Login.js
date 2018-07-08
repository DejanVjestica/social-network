import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "../axios";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            },
            () => {
                // console.log(this.state);
            }
        );
    }

    onSubmit(e) {
        e.preventDefault();
        axios
            .post("/login", this.state)
            .then(resp => {
                if (resp.data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(function(err) {
                console.log(err);
            });
    }
    render() {
        return (
            <div className=" w3-container w3-display-middle w3-theme-d2 w3-padding-16">
                <div className="w3-large w3-margin-bottom">Sign in</div>
                {/* {location.pathname == "/welcome#/login" && (
                    <Link to="/">Register</Link>
                )} */}
                {this.state.error && (
                    <div className="w3-margin-bottom err">
                        {" "}
                        oops login went wrong!
                    </div>
                )}
                <form onSubmit={this.onSubmit} method="post">
                    <input
                        className="w3-input w3-margin-bottom"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={this.onChange}
                    />
                    <input
                        className="w3-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.onChange}
                    />
                    <button className="w3-button w3-section w3-red w3-ripple">
                        Sign in
                    </button>
                </form>
                <Link to="/">Register</Link>
            </div>
        );
    }
}
export default Login;
