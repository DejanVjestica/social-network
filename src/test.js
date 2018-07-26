let onlineUsers = {};

io.on("connection", socket => {
    // -------------------------------
    if (!socket.request.session || !socket.request.session.userId) {
        return socket.disconnect(true);
    }
    // -------------------------------
    const userId = socket.request.session.userId;
    const socketId = socket.id;
    // -------------------------------
    const userIds = Object.values(onlineUsers);
    // -------------------------------
    onlineUsers[socketId] = userId;

    db
        .getUsersByIds(Object.values(onlineUsers))
        .then(({ rows }) => {
            for (var i = 0; i < rows.length; i++) {
                if (!rows[i].imgurl) {
                    rows[i].imgurl = "/img/default.jpg";
                }
                if (rows[i].id == userId) {
                    rows[i].firstname = "You";
                    rows[i].lastname = "";
                }
            }
            socket.emit("onlineUsers", rows);
        })
        .catch(err => console.log("Error in socket.emit onlineUsers ", err));

    // ----------------------------------
    db
        .getChatMessages()
        .then(({ rows }) => {
            for (var i = 0; i < rows.length; i++) {
                if (!rows[i].imgurl) {
                    rows[i].imgurl = "/img/default.jpg";
                }
            }
            socket.emit("chatMessages", rows.reverse());
        })
        .catch(err => console.log("Error in db.getChatMessages", err));
    // ----------------------------------
    if (userIds.filter(id => id == userId).length == 1) {
        db
            .getUserById(userId)
            .then(({ rows }) => {
                if (!rows[0].imgurl) {
                    rows[0].imgurl = "/img/default.jpg";
                }
                socket.broadcast.emit("userJoined", rows[0]);
            })
            .catch(err =>
                console.log("Error in socket.broadcast.emit userJoined ", err)
            );
    }

    socket.on("newChatMessage", function(message) {
        db
            .saveChatMessage(userId, message)
            .then(result => {
                return db.getUserById(userId).then(({ rows }) => {
                    rows[0].user_id = rows[0].id;
                    rows[0].id = result.rows[0].id;
                    rows[0].message = result.rows[0].message;
                    rows[0].created_at = result.rows[0].created_at;
                    io.emit("newChatMessage", rows[0]);
                    console.log("rows0", rows[0]);
                });
            })
            .catch(err => {
                console.log("Error in socket.broadcast.emit userJoined ", err);

                if (err.code == 23502) {
                    socket.emit("exception", {
                        error: "You cannot send an empty message"
                    });
                } else {
                    socket.emit("exception", {
                        error: "Your message could not be sent"
                    });
                }
            });
    });

    socket.on("disconnect", function() {
        const thisUserId = onlineUsers[socketId];
        delete onlineUsers[socketId];
        userIds = Object.values(onlineUsers);

        if (userIds.filter(id => id == thisUserId).length == 0) {
            io.emit("userLeft", thisUserId);
        }
    });
});
