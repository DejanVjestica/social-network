import * as io from "socket.io-client";
// import { createStore, applyMiddleware } from "redux";

import {
    checkForOnlineUsers,
    userHasJoined,
    userHasDisconected,
    checkForMessages,
    newChatMessage
} from "./actions";
// import { store } from "./start";
let socket;
export function getSocket(store) {
    if (!socket) {
        socket = io.connect();

        socket.on("onlineUsers", resp => {
            // console.log("socket.js, running on online users", resp);
            store.dispatch(checkForOnlineUsers(resp));
        });

        socket.on("userJoined", userJoined => {
            // console.log("socket.js, running on userJoined", userJoined);
            store.dispatch(userHasJoined(userJoined));
        });
        //
        socket.on("userLeft", userLeft => {
            // console.log("socket.js, running on userLeft", userLeft);
            store.dispatch(userHasDisconected(userLeft));
        });
        socket.on("chatMessages", messages => {
            // console.log("socket.js, running on chatMessages", messages);
            store.dispatch(checkForMessages(messages));
        });
        socket.on("chatMessage", newMessage => {
            console.log("socket.js, running on chatMessage", newMessage);
            store.dispatch(newChatMessage(newMessage));
        });
    }
    return socket;
}
export function emit(event, data) {
    socket.emit(event, data);
}
