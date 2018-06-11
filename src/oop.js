import React from "react";

class OtherPersonProfile extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const id = this.props.match.param.id;
        axios.get("/users/${id}.json").then(function ({data}) => {
			if (data.redirectToProfil) {
				return this.props.history.push("/")
			}
			this.setState({
				id:data.id,
				image: image.data.image
			})
        });
    }
	render(){
		if (!this.state.id) {
			return null;
		}
	}return(
		<div id="opp"></div>
	)
}
