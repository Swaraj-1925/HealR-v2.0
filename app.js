const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');
var routes = require('./Client/Routes');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const username =process.env.usernameMonog;
const password=process.env.passwordMonog;

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


/**
 * -------------- SESSION SETUP ----------------
 */

var  secret=process.env.SECRET
const conn = "";




app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: `mongodb+srv://${username}:${password}@cluster0.awcvfoh.mongodb.net/Healr?retryWrites=true&w=majority`}),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 
    }
}));




require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.username);
    next();
});

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);


/**
 * -------------- SERVER ----------------
 */
// Server listens on http://localhost:3000

const Port =process.env.PORT ||3000;
app.listen(Port,() =>{
    console.log("server is litting 3000")
});