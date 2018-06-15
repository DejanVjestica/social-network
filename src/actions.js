import axios from "./axios";

export function recieveFriendsAndWannabes() {
    // here comes axios request
    return axios
        .get("/friends.json")
        .then(resp => {
            console.log("inside recieveFriendsAndWannabes: ", resp);
            return {
                type: "RECIEVE_FRIENDS_AND_WANNABES",
                friends: resp.data
            };
        })
        .catch(err => {
            console.log(err);
        });
}
export function acceptRequest(senderId) {
    console.log("accept friendship", senderId);
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

// COmponent Online user -------------------------------------
export function checkForOnlineUsers(onlineUsers) {
    // return "halo";
    console.log("checkForOnlineUsers action", onlineUsers);
    return {
        type: "CHECK_FOR_ONLINE_USERS",
        onlineUsers
    };
    // return axios
    //     .get("/online", {})
    //     .then(resp => {
    //         // console.log("inside deleterequest: ", resp.data);
    //         return {
    //             type: "check_For_Online_Users"
    //         };
    //     })
    //     .catch(err => {
    //         console.log("deleteFriendship catch", err);
    //     });
}
