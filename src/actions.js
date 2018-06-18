import axios from "./axios";

export function recieveFriendsAndWannabes() {
    // here comes axios request
    return axios
        .get("/friends.json")
        .then(resp => {
            // console.log("inside recieveFriendsAndWannabes: ", resp);
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
    // console.log("accept friendship", senderId);
    // here comes axios request
    return axios
        .post("/requestaccepted", {
            senderId: senderId
        })
        .then(resp => {
            // console.log("inside acceptRequest: ", resp.data);
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
    // here comes axios request
    return axios
        .post("/deleterequest", {
            otherUserId: otherUserId
        })
        .then(resp => {
            // console.log("inside deleterequest: ", resp.data);
            return {
                type: "DELETE_REQUEST",
                otherUserId
            };
        })
        .catch(err => {
            console.log("deleteFriendship catch", err);
        });
}

// User has connected -------------------------------------
export function checkForOnlineUsers(onlineUsers) {
    // return "halo";
    // console.log("checkForOnlineUsers action", onlineUsers);
    return {
        type: "CHECK_FOR_ONLINE_USERS",
        onlineUsers
    };
}
// User has disconnected -------------------------------------
export function userHasJoined(userJoined) {
    // console.log("userDisconected action", userJoined);
    return {
        type: "USER_HAS_JOINED",
        userJoined
    };
}
// User has disconnected -------------------------------------
export function userHasDisconected(userLeft) {
    // return "halo";
    // console.log("userDisconected action", userLeft);
    return {
        type: "USER_DISCONECTED",
        userLeft
    };
}
