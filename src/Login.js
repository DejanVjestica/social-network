import React, { Component } from "react";
import axios from "./axios";

// import Register from "./register";
// import { HashRouter, Route } from "react-router-dom";

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
                console.log(this.state);
            }
        );
    }

    onSubmit(e) {
        e.preventDefault();
        axios
            .post("/login", this.state)
            .then(resp => {
                console.log(resp);
                //
                location.replace("/");
            })
            .catch(function(err) {
                console.log(err);
            });
    }
    render() {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.onSubmit} method="post">
                    <input type="email" name="email" onChange={this.onChange} />
                    <input
                        type="password"
                        name="password"
                        onChange={this.onChange}
                    />
                    <button>Login</button>
                </form>
            </div>
        );
    }
}
export default Login;
