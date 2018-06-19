export default function(state = {}, action) {
    if (action.type == "RECIEVE_FRIENDS_AND_WANNABES") {
        state = Object.assign({}, state, {
            friendsList: action.friends
        });
        // console.log("inside reduser: ", state);
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
        // console.log("inside reduser: ", state);
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
        // console.log("inside reduser: ", state);
    }
    // -------------------------------------
    // -------------------------------------
    if (action.type == "CHECK_FOR_ONLINE_USERS") {
        // console.log(" reduser CHECK_FOR_ONLINE_USERS");
        state = Object.assign({}, state, {
            onlineUsers: action.onlineUsers
        });
    }
    if (action.type == "USER_HAS_JOINED") {
        // console.log("reduser USER_HAS_JOINED", action.userJoined);
        state = Object.assign({}, state, {
            onlineUsers: state.onlineUsers.concat(action.userJoined)
        });
    }
    if (action.type == "USER_DISCONECTED") {
        // console.log("reduser USER_DISCONECTED", action.userLeft);
        state = Object.assign({}, state, {
            onlineUsers: state.onlineUsers.filter(
                user => user.id != action.userLeft
            )
        });
    }
    // -------------------------------------
    if (action.type == "CHECK_FOR_MESSAGES") {
        console.log(" reduser CHECK_FOR_MESSAGES", action.chatMessages);
        state = Object.assign({}, state, {
            chatMessages: action.chatMessages
        });
    }
    // -------------------------------------
    if (action.type == "NEW_CHAT_MESSAGE") {
        console.log(" reduser NEW_CHAT_MESSAGE", action.newMessage);
        state = Object.assign({}, state, {
            chatMessages: state.chatMessages.concat(action.newMessage)
        });
    }
    return state;
}

// console.log("inside reduser: ", state);
// console.log("inside reduser: ", state);
