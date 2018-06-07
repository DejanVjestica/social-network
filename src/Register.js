import React, { Component } from "react";
import axios from "./axios";

// import axios from "axios";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            // firstName: "",
            // lastName: "",
            // email: "",
            // password: ""
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
            <div id="register">
                {this.state.error && (
                    <div className="err"> oops registration went wrong!</div>
                )}

                <form onSubmit={this.onRegister} method="post">
                    <h2>Please register</h2>
                    <input
                        type="text"
                        name="firstName"
                        onChange={this.onChange}
                        placeholder="first Name"
                    />
                    <input
                        type="text"
                        name="lastName"
                        onChange={this.onChange}
                        placeholder="last Name"
                    />
                    <input
                        type="email"
                        name="email"
                        onChange={this.onChange}
                        placeholder="email"
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={this.onChange}
                        placeholder="password"
                    />
                    <button>Register</button>
                </form>
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
