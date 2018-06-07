// import React from "react";
import React, { Component } from "react";
// import { HashRouter, Link } from "react-router-dom";
import axios from "axios";
import Logo from "./logo";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.showUploader = this.showUploader.bind(this);
        // this.showUploader = this.showUploader.bind(this);
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState({
                first: data.first,
                last: data.last,
                profilePic: data.profilePic,
                id: data.id
            });
        });
    }
    render() {
        return (
            <div>
                <header>
                    <h2>Pet book</h2>
                    <h2>{}</h2>
                    <a href="./logout">Logout</a>
                    <Logo />
                </header>
            </div>
        );
    }
}
export default App;

//
// class App extends React.Component {
// 	constructor() {
// 		this.showUploader
// 	}
// 	componentDidMount(){
// 		axios.get("/user").then(({data}) =>{
// 			this.setState({
// 				first:data.first,
// 				last:data.last,
// 				profilePic: data.profilePic,
// 				id:data.id
// 			})
// 		})
// 	}
// 	showUploader(){
// 		this.setState({uploaderIsVisible:true})
// 	}
// 	render(){
// 		if (!this.state.id) {
// 			return null;
// 		} return(
// 			<div id="app"><Logo /></div>
// 			<ProfilePic
// 				url={this.state.profilePic}
// 				onClick={this.showUploader}
// 			/>
// 			{this.state.uploaderIsVisible && <Uploader />}
// 		)
// 	}
// }
//
//
// //----------------------
// <img src
