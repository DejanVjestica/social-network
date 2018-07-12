import * as io from "socket.io-client";

import {
    checkForOnlineUsers,
    userHasJoined,
    userHasDisconected,
    checkForMessages,
    newChatMessage
} from "./actions";
let socket;
export function getSocket(store) {
    if (!socket) {
        socket = io.connect();

        socket.on("onlineUsers", resp => {
            store.dispatch(checkForOnlineUsers(resp));
        });

        socket.on("userJoined", userJoined => {
            store.dispatch(userHasJoined(userJoined));
        });
        //
        socket.on("userLeft", userLeft => {
            store.dispatch(userHasDisconected(userLeft));
        });
        socket.on("chatMessages", messages => {
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
