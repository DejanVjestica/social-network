import React from "react";
import { connect } from "react-redux";
// import { checkForOnlineUsers } from "./actions.js";

class Online extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {this.props.onlineUsers &&
                    this.props.onlineUsers.map(onlineUsers => {
                        return (
                            <div key={onlineUsers.id}>
                                <h2>{onlineUsers.first}</h2>
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
        onlineUsers: state.onlineUsers && state.onlineUsers
        // pending:
        //     state.friendsList &&
        //     state.friendsList.filter(friend => friend.status == 1),
        // friends:
        //     state.friendsList &&
        //     state.friendsList.filter(friend => friend.status == 2)
    };
};
// ---------------------------------------
export default connect(mapStateToProps)(Online);
