import React from "react";
import { connect } from "react-redux";
// import { checkForOnlineUsers } from "./actions.js";

class Online extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="onlineUsers wrapper">
                <header>
                    <h4>Online now</h4>
                </header>
                {this.props.onlineUsers &&
                    this.props.onlineUsers.map(onlineUsers => {
                        return (
                            <div className="onlineUser" key={onlineUsers.id}>
                                <img className="" src={onlineUsers.image} />
                                <p>
                                    {onlineUsers.first} {onlineUsers.last}
                                </p>
                            </div>
                        );
                    })}
            </div>
        );
    }
    componentDidMount() {
        // this.props.dispatch(checkForOnlineUsers());
    }
}
const mapStateToProps = state => {
    return {
        // type: state.type,
        onlineUsers: state.onlineUsers && state.onlineUsers,
        pending:
            state.friendsList &&
            state.friendsList.filter(friend => friend.status == 1),
        friends:
            state.friendsList &&
            state.friendsList.filter(friend => friend.status == 2)
    };
};
// ---------------------------------------
export default connect(mapStateToProps)(Online);
