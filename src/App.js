import React from "react";
import React, { Component } from "react";
import axios from "axios";
import Logo from "./logo";

class App React.Component {
	constructor() {
		this.showUploader
	}
	componentDidMount(){
		axios.get("/user").then(({data}) =>{
			this.setState({
				first:data.first,
				last:data.last,
				profilePic: data.profilePic,
				id:data.id
			})
		})
	}
	showUploader(){
		this.setState({uploaderIsVisible:true})
	}
	render(){
		if (!this.state.id) {
			return null;
		} return(
			<div id="app"><Logo /></div>
			<ProfilePic
				url={this.state.profilePic}
				onClick={this.showUploader}
			/>
			{this.state.uploaderIsVisible && <Uploader />}
		)
	}
}


//----------------------
<img src
