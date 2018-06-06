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
    console.log("route /welcome req.body", req.body);
    db
        .hashPassword(req.body.password)
        .then(function(hashedPassword) {
            console.log("this is hashted pass", hashedPassword);
            //
            db
                .registerUser(
                    req.body.firstName,
                    req.body.lastName,
                    req.body.email,
                    hashedPassword
                )
                .then(function(body) {
                    console.log("in register user index.js");
                    // console.log(body);
                    let userId = body.rows[0].id;
                    let firstName = req.body.firstName;
                    let lastName = req.body.lastLast;
                    let email = req.body.email;
                    // setting cookie session
                    req.session.userId = userId;
                    req.session.firstName = firstName;
                    req.session.lastName = lastName;
                    req.session.email = email;
                    res.redirect("/");
                })
                .catch(function(e) {
                    console.log("register user: ", e);
                });
        })
        .catch(function(e) {
            console.log("/register: ", e);
        });
    // if (req.session.userId) {
    //     res.redirect("/");
    // } else {
    //     console.log("route /welcome userId ", req.session.userId);
    //     res.sendFile(__dirname + "/index.html");
    // }
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
        return res.redirect("/");
    }
    res.sendFile(__dirname + "/index.html");
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
