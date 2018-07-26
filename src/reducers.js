export default function(state = {}, action) {
    // -------------------------------------
    if (action.type == "RECIEVE_FRIENDS_AND_WANNABES") {
        state = Object.assign({}, state, {
            friendsList: action.friends
        });
    }
    // -------------------------------------
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
    }
    // -------------------------------------
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
    }
    // -------------------------------------
    if (action.type == "GET_LOGED_USER") {
        console.log("GET_LOGED_USER");
        state = Object.assign({}, state, {
            logedUser: action.logedUser
        });
    }
    // -------------------------------------
    if (action.type == "CHECK_FOR_ONLINE_USERS") {
        console.log("1: CHECK_FOR_ONLINE_USERS");
        state = Object.assign({}, state, {
            onlineUsers: action.onlineUsers
        });
    }
    // -------------------------------------
    if (action.type == "CHECK_FOR_MESSAGES") {
        console.log("2: CHECK_FOR_MESSAGES");
        state = Object.assign({}, state, {
            chatMessages: action.chatMessages
        });
    }
    // -------------------------------------
    if (action.type == "NEW_CHAT_MESSAGE") {
        console.log("3: NEW_CHAT_MESSAGE");
        state = Object.assign({}, state, {
            chatMessages: state.chatMessages.concat(action.newMessage)
        });
    }
    // -------------------------------------
    if (action.type == "USER_HAS_JOINED") {
        console.log("4: USER_HAS_JOINED");
        state = Object.assign({}, state, {
            onlineUsers: state.onlineUsers.concat(action.userJoined)
        });
    }

    // -------- USER_DISCONECTED -------------
    if (action.type == "USER_DISCONECTED") {
        console.log("5: USER_DISCONECTED");
        state = Object.assign({}, state, {
            onlineUsers: state.onlineUsers.filter(
                user => user.id != action.userLeft
            )
        });
    }
    // -------------------------------------
    if (action.type == "GET_SEARCH_FOR_USER") {
        state = Object.assign({}, state, {
            searchResults: action.searchResults
        });
    }
    // -------------------------------------
    return state;
}
