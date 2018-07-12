import React from "react";
import { connect } from "react-redux";

class ProfilePic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}
    render() {
        return (
            <React.Fragment>
                {!this.props.logedUser.image && (
                    <img
                        className="profileImg"
                        src="/images/default-profile-picture.jpg"
                        onClick={this.props.whenClick}
                    />
                )}
                {this.props.logedUser.image && (
                    <img
                        className="profileImg"
                        src={this.props.logedUser.image}
                        onClick={this.props.whenClick}
                    />
                )}
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        logedUser: state.logedUser && state.logedUser
    };
};
export default connect(mapStateToProps)(ProfilePic);
