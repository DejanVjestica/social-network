const express = require("express");
const app = express();
const compression = require("compression");

// csurf -----------------------------------------------
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const pathPublic = "public";
const db = require("./db");

// Uploading files ---------------------------------------
const s3 = require("./s3");

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

// const csurf = require("csurf");
// cookie parser ---------------------------------------
app.use(require("cookie-parser")());
// cookie session ---------------------------------------
app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);
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
    // let userId;
    // console.log("userId ", req.session.userId);
    // userId = false;
    // req.session.userId = userId;
    // console.log("route /welcome req.body", req.body);
    db
        .hashPassword(req.body.password)
        .then(function(hashedPassword) {
            // console.log("this is hashted pass", hashedPassword);
            //
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
            // res.redirect("/");
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
    // if (req.session.userId) {
    //     res.redirect("/");
    // } else {
    //     console.log("route /welcome userId ", req.session.userId);
    //     res.sendFile(__dirname + "/index.html");
    // }
});
app.post("/login", function(req, res) {
    // console.log("/login: ", req.body, req.body.email);
    db
        .getUserByEmail(req.body.email)
        .then(function(user) {
            // console.log(
            //     "getUserByEmail: ",
            //     // user.rows,
            //     req.body.password,
            //     user.rows[0].hash_password
            // );
            return db
                .checkPassword(req.body.password, user.rows[0].hash_password)
                .then(function(doesMatch) {
                    // console.log(req.body.password, user.rows[0].hash_password);
                    if (doesMatch) {
                        // console.log("does match", user.rows);
                        // throw new Error(
                        //     console.log("login route after check password")
                        // );
                        req.session.userId = user.rows[0].userid;
                        req.session.firstName = user.rows[0].firstName;
                        req.session.lastName = user.rows[0].lastName;
                        // res.redirect("/");
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
app.get("/logout", function(req, res) {
    req.session = null;
    // console.log("route /logout: ", req.session);
    // res.redirect("/");
    // res.json({
    //     success: true
    // });
    res.redirect("/welcome");
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
app.get("/user", function(req, res) {
    db
        .getUserById(req.session.userId)
        .then(function(user) {
            // console.log(req.session.userid);
            res.json(user.rows[0]);
            // console.log(user.rows);
        })
        .catch(function(err) {
            res.sendStatus(404);
            console.log(err);
        });
});
// ______________________________________________
// Other users profile
// ______________________________________________
app.get("/users/:id.json", function(req, res) {
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
        .catch(function(err) {
            res.sendStatus(404);
            console.log(err);
        });
});
// _________________________________________
app.get("/friendships/:id.json", function(req, res) {
    console.log(
        "in route friendships index.js: ",
        req.session.userId,
        req.params.id
    );
    db
        .checkFriendshipStatus(req.session.userId, req.params.id)
        .then(function(statusResult) {
            // console.log(
            //     "inside friendship route:",
            //     console.log(statusResult.data.rows[0])
            // );
            res.json({ statusResult });
            console.log("after check friend_:", statusResult);
        })
        .catch(function(err) {
            res.sendStatus(404);
            console.log("server side: ", err);
        });
});
// _________________________________________
// _________________________________________
// -----------------------------------------
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
    // console.log("Image uploaded successfully");
});
// --------------------------------------------------
app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
// Always last route
app.get("*", function(req, res) {
    if (!req.session.userId) {
        // console.log("user not loged in, redirecting to welcome");
        // res.redirect("/welcome");
    } else {
        // console.log("user detected");
        res.sendFile(__dirname + "/index.html");
    }
});

// Server listens
app.listen(8080, function() {
    console.log("I'm listening.");
});

// custom midleware --------------------------
// function requireUserId(req, res, next) {
//     if (req.session.userId) {
//         res.redirect("/");
//     } else {
//         next();
//     }
// }
