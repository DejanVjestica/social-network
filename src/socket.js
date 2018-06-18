import * as io from "socket.io-client";
// import { createStore, applyMiddleware } from "redux";

import {
    checkForOnlineUsers,
    userHasJoined,
    userHasDisconected
} from "./actions";
// import { store } from "./start";
let socket;
export function getSocket(store) {
    if (!socket) {
        socket = io.connect();

        socket.on("onlineUsers", onlineUsers => {
            // console.log("socket.js, running on online users", onlineUsers);
            store.dispatch(checkForOnlineUsers(onlineUsers));
        });

        socket.on("userJoined", userJoined => {
            // console.log("socket.js, running on userJoined", userJoined);
            store.dispatch(userHasJoined(userJoined));
        });

        socket.on("userLeft", userLeft => {
            // console.log("socket.js, running on userLeft", userLeft);
            store.dispatch(userHasDisconected(userLeft));
        });
        // socket.on("chatMessages", messages => {
        //     // console.log("socket.js, running on userLeft", userLeft);
        //     // store.dispatch(userHasDisconected(userLeft));
        // });
        // socket.on("chatMessage", message => {
        //     // console.log("socket.js, running on userLeft", userLeft);
        //     // store.dispatch(userHasDisconected(userLeft));
        // });
    }
    return socket;
}
export function emit(event, data) {
    socket.emit(event, data);
}
