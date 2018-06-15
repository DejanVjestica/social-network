import React from "react";
import { connect } from "react-redux";
import {
    recieveFriendsAndWannabes,
    acceptRequest,
    endFriendship
} from "./actions.js";

class Friends extends React.Component {
    // -----------------------------------------
    constructor(props) {
        super(props);
    }
    // -------------------------------------
    render() {
        // console.log("friends");
        return (
            <div className="friendList">
                <div className="pendingFriends">
                    <h2>Pending friends</h2>
                    {this.props.pending &&
                        this.props.pending.map(pending => {
                            return (
                                // <div>{pending.first}</div>

                                <div className="" key={pending.id}>
                                    {/* <img
                                        className=""
                                        src={
                                            pending.image || "/assets/user.png"
                                        }
                                    /> */}
                                    {pending.first} {pending.last} {pending.id}
                                    <button
                                        onClick={() =>
                                            this.props.dispatch(
                                                acceptRequest(pending.id)
                                            )
                                        }
                                    >
                                        accept
                                    </button>
                                    <br />
                                </div>
                            );
                        })}
                </div>
                <div className="currentFriends">
                    <h2>Current friends</h2>
                    {this.props.friends &&
                        this.props.friends.map(friends => {
                            return (
                                // <div>{pending.first}</div>

                                <div className="" key={friends.id}>
                                    {/* <img
                                        className=""
                                        src={
                                            friends.image || "/assets/user.png"
                                        }
                                    /> */}
                                    {friends.first} {friends.last} {friends.id}
                                    <button
                                        onClick={() =>
                                            this.props.dispatch(
                                                endFriendship(friends.id)
                                            )
                                        }
                                    >
                                        end friendship
                                    </button>{" "}
                                    <br />
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
    // {this.props.pending && this.props.pending.map(pending =>{
    //
    // })}
    // ----------------------------------
    componentDidMount() {
        this.props.dispatch(recieveFriendsAndWannabes());
    }
}
// -------------------------------------------------
const mapStateToProps = state => {
    return {
        // type: state.type,
        pending:
            state.friendsList &&
            state.friendsList.filter(friend => friend.status == 1),
        friends:
            state.friendsList &&
            state.friendsList.filter(friend => friend.status == 2)
    };
};
// ---------------------------------------
export default connect(mapStateToProps)(Friends);
