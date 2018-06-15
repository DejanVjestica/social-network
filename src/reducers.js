export default function(state = {}, action) {
    if (action.type == "RECIEVE_FRIENDS_AND_WANNABES") {
        state = Object.assign({}, state, {
            friendsList: action.friends
        });
        console.log("inside reduser: ", state);
    }
    // accept
    if (action.type == "ACCEPT_REQUEST") {
        state = Object.assign({}, state, {
            friendsList: state.friendsList.map(user => {
                if (user.id == action.senderId) {
                    return {
                        ...user,
                        status: 2
                    };
                } else {
                    return user;
                }
            })
        });
        console.log("inside reduser: ", state);
    }
    if (action.type == "DELETE_REQUEST") {
        state = Object.assign({}, state, {
            friendsList: state.friendsList.map(user => {
                if (user.id == action.otherUserId) {
                    return {
                        ...user,
                        status: 0
                    };
                } else {
                    return user;
                }
            })
        });
        console.log("inside reduser: ", state);
    }
    if (action.type == "CHECK_FOR_ONLINE_USERS") {
        state = Object.assign({}, state, {
            onlineUsers: action.onlineUsers
        });
        console.log("inside reduser: ", state);
    }
    return state;
}
