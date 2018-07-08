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
            // console.log("componentDidMount data", data);
            // console.log(this.state.firstName, this.state.lastName);
            // this.setState(
            // 	{
            // 		first: data.first,
            // 		last: data.last,
            // 		userid: data.id,
            // 		image: data.image,
            // 		bio: data.bio
            // 	},
            // 	() => {}
            // );
        })
        .catch(function(err) {
            console.log(err);
        });
}
// FRIENDSHIP BUTTON ------------------------
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
        .then(() => {
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
        .then(() => {
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

// SOCKET -------------------------------------------------
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
    // console.log("user has joined action", userJoined);
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
// User has disconnected -------------------------------------
export function checkForMessages(chatMessages) {
    // return "halo";

    // console.log("checkForMessages action", chatMessages);
    return {
        type: "CHECK_FOR_MESSAGES",
        chatMessages
    };
}
// Search action creator ----------------------------------------
export function getSearchForUser(userSearch) {
    // return "halo";

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
