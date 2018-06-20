import React from "react";
import { connect } from "react-redux";
import {
    recieveFriendsAndWannabes,
    acceptRequest,
    endFriendship
} from "./actions.js";

import { BrowserRouter, Link, Route } from "react-router-dom";
class Friends extends React.Component {
    // -----------------------------------------
    constructor(props) {
        super(props);
    }
    handleGoToProfile() {
        console.log("handleGoToProfile");
    }
    // -------------------------------------
    render() {
        console.log("friends", this.props.friends);
        console.log("pending", Array.isArray(this.props.pending));
        // if (this.props.pending) {
        //     console.log("true", this.props.pending);
        // } else {
        //     console.log("false", this.props.friends);
        // }
        return (
            <div className="friendList flexItem elementPadding">
                <div className="pendingFriends">
                    {this.props.pending &&
                        this.props.pending.length === 0 && (
                            <header>
                                <h4>Pending friends</h4>
                            </header>
                        )}
                    {this.props.pending &&
                        this.props.pending.map(pending => {
                            return (
                                // <div>{pending.first}</div>

                                <div
                                    className="pendingFriend "
                                    key={pending.id}
                                >
                                    <img className="" src={pending.image} />
                                    <p>
                                        {pending.first} {pending.last}{" "}
                                        {pending.id}
                                    </p>

                                    <button
                                        className=""
                                        onClick={() =>
                                            this.props.dispatch(
                                                acceptRequest(pending.id)
                                            )
                                        }
                                    >
                                        accept
                                    </button>
                                    {/* <a href=`/user/{pending.id}`></a> */}
                                    {/* <a href={`/user/{$pending.id}`}>
                                        go to profile
                                    </a> */}
                                    {/* <button onClick={this.handleGoToProfile}>
                                        go to profile
                                    </button> */}
                                </div>
                            );
                        })}
                </div>
                <div className="currentFriends">
                    {this.props.friends && (
                        <header>
                            <h4>Current friends</h4>
                        </header>
                    )}
                    {this.props.friends &&
                        this.props.friends.map(friends => {
                            return (
                                // <div>{pending.first}</div>

                                <div
                                    className="currentFriend "
                                    key={friends.id}
                                >
                                    <img className="" src={friends.image} />
                                    {friends.first} {friends.last} {friends.id}
                                    <button
                                        onClick={() =>
                                            this.props.dispatch(
                                                endFriendship(friends.id)
                                            )
                                        }
                                    >
                                        end friendship
                                    </button>
                                    <Link to={`/user/${friends.id}`}>
                                        Go to Profile
                                    </Link>
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
