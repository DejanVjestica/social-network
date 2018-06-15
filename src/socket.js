import * as io from "socket.io-client";
import { checkForOnlineUsers } from "./actions";
let socket;
export function getSocket(store) {
    if (!socket) {
        socket = io.connect();
        socket.on("onlineUsers", onlineUsers => {
            console.log("running on online users", onlineUsers);
            store.dispatch(checkForOnlineUsers(onlineUsers));
        });
        // socket.on("userJoined", users => {});
        // socket.on("userLeft", users => {});
    }
    return socket;
}

// if (action.type == "USER_JOINED") {
//     return {
//         ...state
//     };
// }
