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

// SOCKET -------------------------------------------------
// User has connected -------------------------------------
export function checkForOnlineUsers(onlineUsers) {
    return {
        type: "CHECK_FOR_ONLINE_USERS",
        onlineUsers
    };
}
// User has disconnected -------------------------------------
export function userHasJoined(userJoined) {
    return {
        type: "USER_HAS_JOINED",
        userJoined
    };
}
// User has disconnected -------------------------------------
export function userHasDisconected(userLeft) {
    return {
        type: "USER_DISCONECTED",
        userLeft
    };
}
// User has disconnected -------------------------------------
export function checkForMessages(chatMessages) {
    return {
        type: "CHECK_FOR_MESSAGES",
        chatMessages
    };
}
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
