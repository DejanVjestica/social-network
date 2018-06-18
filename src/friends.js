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
            <div className="friendList wrapper">
                <div className="pendingFriends">
                    <header>
                        <h4>Pending friends</h4>
                    </header>
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
                                    <br />
                                </div>
                            );
                        })}
                </div>
                <div className="currentFriends">
                    <header>
                        <h4>Current friends</h4>
                    </header>
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
