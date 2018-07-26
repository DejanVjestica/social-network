import axios from "./axios";

// GET USER DATA ----------------------------
export function getLogedUser() {
    return axios
        .get("/user")
        .then(({ data }) => {
            return {
                type: "GET_LOGED_USER",
                logedUser: data
            };
        })
        .catch(function(err) {
            console.log(err);
        });
}
// FRIENDSHIP BUTTON ------------------------
export function recieveFriendsAndWannabes() {
    return axios
        .get("/friends.json")
        .then(resp => {
            return {
                type: "RECIEVE_FRIENDS_AND_WANNABES",
                friends: resp.data
            };
        })
        .catch(err => {
            console.log("inside wanabes and friends catch: ", err);
        });
}
export function acceptRequest(senderId) {
    return axios
        .post("/requestaccepted", {
            senderId: senderId
        })
        .then(() => {
            return {
                type: "ACCEPT_REQUEST",
                senderId
            };
        })
        .catch(err => {
            console.log("acceptFriendship catch", err);
        });
}
export function endFriendship(otherUserId) {
    return axios
        .post("/deleterequest", {
            otherUserId: otherUserId
        })
        .then(() => {
            return {
                type: "DELETE_REQUEST",
                otherUserId
            };
        })
        .catch(err => {
            console.log("deleteFriendship catch", err);
        });
}
// --------------------------------------------------------
// SOCKET -------------------------------------------------
// socket.emit("onlineUsers", rows); ----------------------
export function checkForOnlineUsers(onlineUsers) {
    console.log("action emit onlineUsers", onlineUsers);
    console.log("1: action checkForOnlineUsers");
    return {
        type: "CHECK_FOR_ONLINE_USERS",
        onlineUsers
    };
}
// ----------------------------------------------------------
// socket.emit("chatMessages", rows); ---------------------
export function checkForMessages(chatMessages) {
    console.log("2: action emit chatMessages", chatMessages);

    return {
        type: "CHECK_FOR_MESSAGES",
        chatMessages
    };
}
// ------------------------------------------------------------
export function newChatMessage(newMessage) {
    console.log("3: action emit newChatMessage", newMessage);
    return {
        type: "NEW_CHAT_MESSAGE",
        newMessage
    };
}
// ----------------------------------------------------------
// socket.broadcast.emit("userJoined", rows); --------------
export function userHasJoined(userJoined) {
    console.log("4: action emit userHasJoined", userJoined);

    return {
        type: "USER_HAS_JOINED",
        userJoined
    };
}
// ----------------------------------------------------------
// io.sockets.emit("userLeft", thisUserId); ---------------
export function userHasDisconected(userLeft) {
    console.log("5: action emit userHasDisconected", userLeft);
    return {
        type: "USER_DISCONECTED",
        userLeft
    };
}
// ------------------------------------------------------------
// Search action creator ----------------------------------------
export function getSearchForUser(userSearch) {
    console.log("getSearchForUser action", userSearch);
    return axios
        .get(`/search?q=${encodeURIComponent(userSearch)}`)
        .then(({ data }) => {
            console.log("action axios", encodeURIComponent(userSearch), data);
            return {
                type: "GET_SEARCH_FOR_USER",
                searchResults: data
            };
        })
        .catch(err => {
            console.log(err);
        });
}
