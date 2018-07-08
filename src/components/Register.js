import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "../axios";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            email: "",
            password: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onRegister = this.onRegister.bind(this);
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
    onRegister(e) {
        e.preventDefault();

        axios
            .post("/register", this.state)
            .then(resp => {
                // location.replace("/");

                // console.log(resp);
                if (resp.data.success) {
                    // console.log(this.state);
                    location.replace("/");
                } else {
                    // console.log("error");
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
                <div className="w3-large w3-margin-bottom">
                    Create your Account
                </div>

                {/* {location.pathname == "/welcome" && (
                    <Link to="/login">Login</Link>
                )} */}
                {this.state.error && (
                    <div className="err"> oops registration went wrong!</div>
                )}

                <form onSubmit={this.onRegister} method="post">
                    <input
                        className="w3-input w3-margin-bottom"
                        type="text"
                        name="first"
                        onChange={this.onChange}
                        placeholder="first Name"
                    />
                    <input
                        className="w3-input w3-margin-bottom"
                        type="text"
                        name="last"
                        onChange={this.onChange}
                        placeholder="last Name"
                    />
                    <input
                        className="w3-input w3-margin-bottom"
                        type="email"
                        name="email"
                        onChange={this.onChange}
                        placeholder="email"
                    />
                    <input
                        className="w3-input"
                        type="password"
                        name="password"
                        onChange={this.onChange}
                        placeholder="password"
                    />
                    <button className="w3-button w3-section w3-red w3-ripple">
                        Register new Account
                    </button>
                </form>
                <Link to="/login">Login</Link>
            </div>
        );
    }
}
export default Register;
//

//
// function Registration() {
//     //
// 	return(
// 	)
// }
