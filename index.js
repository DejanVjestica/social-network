// express app -----------------------------------
const express = require("express");
const app = express();
const compression = require("compression");

// socket.io -------------------------------
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });
// csurf -----------------------------------------------
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const pathPublic = "public";
const db = require("./db");
// Amazon web services s3 ---------------------------------------
const s3 = require("./s3");
// Multer ----------------------------------
const config = require("./config");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});
const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
//---------------------------------------------------
// Midlewhare
// --------------------------------------------------
// cookie parser ---------------------------------------
app.use(require("cookie-parser")());
// cookie session ---------------------------------------
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});
app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
// body parser -------------------------------
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
// csurf --------------------------------------
app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});
// This midlewhare is compresing data
app.use(compression());

//
if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// public files ----------------------------------------
app.use(express.static(pathPublic));

// ----------------------------------------------
// Routes --------------------------------------
// ---------------------------------------------
app.post("/register", function(req, res) {
    db
        .hashPassword(req.body.password)
        .then(function(hashedPassword) {
            return db.registerUser(
                req.body.first,
                req.body.last,
                req.body.email,
                hashedPassword
            );
        })
        .then(function(result) {
            req.session.userId = result.rows[0].id;
            req.session.firstName = req.body.first;
            req.session.lastName = req.body.last;
        })
        .then(function() {
            res.json({
                success: true
            });
        })
        .catch(function(err) {
            console.log("/register: ", err);
            res.json({
                err: true
            });
        });
});
// ---------------------------------------------
app.post("/login", function(req, res) {
    // console.log("/login: ", req.body, req.body.email);
    db
        .getUserByEmail(req.body.email)
        .then(function(user) {
            return db
                .checkPassword(req.body.password, user.rows[0].hash_password)
                .then(function(doesMatch) {
                    // console.log(req.body.password, user.rows[0].hash_password);
                    if (doesMatch) {
                        req.session.userId = user.rows[0].userid;
                        req.session.firstName = user.rows[0].firstName;
                        req.session.lastName = user.rows[0].lastName;
                        res.json({
                            success: true
                        });
                    } else {
                        res.json({
                            err: true
                        });
                    }
                });
        })
        .catch(function(err) {
            console.log("route login main catch/ login user: ", err);
            res.json({
                err: true
            });
        });
});
// --------------------------------------------
app.get("/logout", function(req, res) {
    req.session = null;
    res.redirect("/welcome");
});
// Upload Profile image ------------------------------------------
app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    db
        .updateProfileImage(
            req.session.userId,
            config.s3Url + req.file.filename
        )
        .then(function(result) {
            res.json(result.rows[0].image);
        })
        .catch(function(err) {
            console.log("error in upload", err);
        });
});
// ---------------------------------------------
app.post("/uploadbio", function(req, res) {
    // console.log("inside uploadbio ");
    db
        .updateBio(req.session.userId, req.body.bio)
        .then(function(data) {
            // console.log("route uploadbio", req.session.userId, req.body.bio);
            res.json(data.rows[0]);
        })
        .catch(function(err) {
            console.log(err);
        });
});
// this route check if user is register on app component
app.get("/user", (req, res) => {
    db
        .getUserById(req.session.userId)
        .then(user => {
            // console.log(req.session.userid);
            res.json(user.rows[0]);
            // console.log(user.rows);
        })
        .catch(err => {
            res.sendStatus(404);
            console.log(err);
        });
});
// ------------------------------------------------
// Other users profile
// ------------------------------------------------
app.get("/users/:id.json", (req, res) => {
    if (req.params.id == req.session.userId) {
        return res.json({
            redirectToProfil: true
        });
    }
    db
        .getUserById(req.params.id)
        .then(({ rows }) => {
            //
            res.json(rows[0]);
            // console.log(rows);
        })
        .catch(err => {
            res.sendStatus(404);
            console.log(err);
        });
});
// ------------------------------------------------
// Friendships
// ------------------------------------------------
app.get("/friendships/:id.json", (req, res) => {
    // console.log(
    //     "in route friendships index.js: ",
    //     req.session.userId,
    //     req.params.id
    // );
    db
        .checkFriendshipStatus(req.session.userId, req.params.id)
        .then(statusResult => {
            // console.log("inside friendship route:", statusResult.rows[0]);
            res.json(statusResult.rows[0] || {});
            // console.log("after check friend_:", statusResult);
        })
        .catch(err => {
            res.sendStatus(404);
            console.log("server side: ", err);
        });
});

// mace request --------------------
app.post("/makerequest", (req, res) => {
    db
        .makeRequest(req.session.userId, req.body.recipientId)
        .then(data => {
            // console.log("data rows:", data.rows[0]);
            res.json(data.rows[0] || {});
        })
        .catch(err => {
            console.log(err);
        });
});
// accept request --------------------
app.post("/requestaccepted", (req, res) => {
    // console.log(req.body);
    db
        .requestAccepted(req.session.userId, req.body.senderId)
        .then(data => {
            // console.log("data rows:", data.rows[0]);
            res.json(data.rows[0] || {});
        })
        .catch(err => {
            console.log(err);
        });
});
// cansel request --------------------
app.post("/deleterequest", (req, res) => {
    db
        .cancelRequest(req.session.userId, req.body.otherUserId)
        .then(data => {
            // console.log("data rows:", data.rows[0]);
            res.json(data.rows[0] || {});
        })
        .catch(err => {
            console.log(err);
        });
});
// Friends list

app.get("/friends.json", (req, res) => {
    db
        .getPendingAndFriends(req.session.userId)
        .then(data => {
            // console.log("coming from request:", data.rows);
            res.json(data.rows);
        })
        .catch(err => {
            console.log(err);
        });
});
// app.get("/chat", (req, res) => {
//     db
//         .getChatMessages()
//         .then(data => {
//             console.log("inside route /chat", data.rows);
//             res.json(data.rows);
//         })
//         .catch(err => {
//             console.log("Inside route /chat, catch", err);
//         });
// });
// // _________________________________________
// _________________________________________
// -----------------------------------------

// --------------------------------------------------
app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
// Always last route
app.get("*", (req, res) => {
    if (!req.session.userId) {
        // console.log("user not loged in, redirecting to welcome");
        res.redirect("/welcome");
    } else {
        // console.log("user detected");
        res.sendFile(__dirname + "/index.html");
    }
});

// Server listens
server.listen(8080, () => {
    console.log("I'm listening.");
});

// io socket --------------------------------------
let onlineUsers = {};
let chatMessages = {};
io.on("connection", socket => {
    if (!socket.request.session || !socket.request.session.userId) {
        return socket.disconnect(true);
    }
    const userId = socket.request.session.userId;
    const userIds = Object.values(onlineUsers);
    onlineUsers[socket.id] = userId;
    chatMessages[socket.id] = userId;
    console.log(`socket with the socket.id ${socket.id} is now connected`);
    // console.log("ONLINEUSERS: ", onlineUsers, userIds);

    // Check for online users ------------------------------------
    db
        .getUsersBeiIds(Object.values(onlineUsers))
        .then(({ rows }) => {
            // Emit online users ----------------------------
            socket.emit("onlineUsers", rows);
        })
        .catch(err => {
            console.log("Inside route /chat, catch", err);
        });
    // Checks for Chat messages ------------------------------------
    db
        .getChatMessages()
        .then(({ rows }) => {
            // console.log("inside chat", rows);
            socket.emit("chatMessages", rows);
            // res.json(rows);
        })
        .catch(err => {
            console.log("Inside chat, catch", err);
        });
    let count = Object.values(onlineUsers).filter(id => id == userId).length;
    if (count == 1) {
        db.getUserById(userId).then(({ rows }) => {
            // console.log("after second query", rows);
            // Broadcasting user joined --------------s
            socket.broadcast.emit("userJoined", rows);
        });
    }
    // -------------------------------------------------
    // ON NEW CHAT MESSAGE
    // -------------------------------------------------
    socket.on("chatMessage", newMessage => {
        // const thisUserMessage = chatMessages[socket.id];
        console.log("index on chatMessage", newMessage, userId);
        db
            .newChatMessage(newMessage, userId)
            .then(({ rows }) => {
                console.log("chatMessage", rows);

                db
                    .getUserById(rows[0].sender_id)
                    .then(data => {
                        let newMessage = Object.assign(rows[0], data.rows[0]);
                        console.log("db query get User by id", newMessage);
                        io.sockets.emit("chatMessage", newMessage);
                    })
                    .catch(function(err) {
                        console.log("inside catcht chat message", err);
                    });
                // Broadcasting user joined --------------s
                // socket.broadcast.emit("userJoined", rows);
            })
            .catch(function(err) {
                console.log("chatMessage catch", err);
            });
        // store.dispatch(checkForMessages(userLeft));
    });
    // -------------------------------------------------
    // DISCONECT
    // -------------------------------------------------
    socket.on("disconnect", function() {
        console.log(
            `socket with the socket.id ${socket.id} is now disconnected`
        );
        const thisUserId = onlineUsers[socket.id];
        // console.log("disconnect hapend", thisUserId, userId, onlineUsers);
        delete onlineUsers[socket.id];
        // console.log("after delete", onlineUsers);
        let userIndex = userIds.indexOf(userId);
        userIds.splice(userIndex, 1);

        if (userIds.indexOf(userId) == -1) {
            io.sockets.emit("userLeft", thisUserId);
        }
    });
});
