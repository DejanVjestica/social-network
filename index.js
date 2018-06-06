const express = require("express");
const app = express();
const compression = require("compression");

// csurf
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const pathPublic = "public";
// const csurf = require("csurf");

// cookie session ---------------------------------------
app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
// csurf
app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

// app.use(csurf());
// const cookieSession = require("cookie_session");
// setup cookies
// app.use(cookieSession());

// cookie parser ---------------------------------------
app.use(require("cookie-parser")());
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
app.get("/welcome", function(req, res) {
    console.log("userId ", req.session.userId);
    res.sendFile(__dirname + "/index.html");
    // if (req.session.userId) {
    //     res.redirect("/");
    // } else {
    //     console.log("userId ", req.session.userId);
    // }
    //
});

app.post("/register", (req, res) => {
    console.log(" /register: ", req.body);
    // res.send("yes");
});
app.post("/login", (req, res) => {
    console.log(" /login: ", req.body);
    // res.send("yes");
    // 1. get hash from DB based on email
    // 2.use bcript to compare the palin text passwort to the hash from db
    // 3. if returns true then set session ingo and send res.json() s ackerr msg
});

// Always last route
app.get("*", function(req, res) {
    // console.log(req.url);
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// Server listens
app.listen(8080, function() {
    console.log("I'm listening.");
});
