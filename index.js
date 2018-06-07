const express = require("express");
const app = express();
const compression = require("compression");

// csurf
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const pathPublic = "public";
const db = require("./db");

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

// app.use(csurf());
// const cookieSession = require("cookie_session");
// setup cookies
// app.use(cookieSession());

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
                req.body.firstName,
                req.body.lastName,
                req.body.email,
                hashedPassword
            );
        })
        .then(function(result) {
            req.session.userId = result.rows[0].id;
            req.session.firstName = req.body.firstName;
            req.session.lastName = req.body.lastName;
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
    console.log("/login: ", req.body, req.body.email);
    db
        .getUserByEmail(req.body.email)
        .then(function(user) {
            console.log(
                "getUserByEmail: ",
                // user.rows,
                req.body.password,
                user.rows[0].hash_password
            );
            return db
                .checkPassword(req.body.password, user.rows[0].hash_password)
                .then(function(doesMatch) {
                    console.log(req.body.password, user.rows[0].hash_password);
                    if (doesMatch) {
                        console.log("does match", user.rows);
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
// app.post("/login", (req, res) => {
//     console.log(" /login: ", req.body);
//     res.sendFile(__dirname + "/index.html");
//     // res.send("yes");
//     // 1. get hash from DB based on email
//     // 2.use bcript to compare the palin text passwort to the hash from db
//     // 3. if returns true then set session ingo and send res.json() s ackerr msg

// });
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
        console.log("user not loged in, redirecting to welcome");
        res.redirect("/welcome");
    } else {
        console.log("user detected");
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
