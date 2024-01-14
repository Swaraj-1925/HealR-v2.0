const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');
var routes = require('./Routes');
const fileUpload = require('express-fileupload');
const MongoStore = require('connect-mongo');
const { constants } = require('buffer');
require('dotenv').config();

const username =process.env.usernameMonog;
const password=process.env.passwordMonog;

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'))
var  secret=process.env.SECRET
app.use(fileUpload());
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


app.use(express.static(path.join(__dirname,'/public')));

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);


/**
 * -------------- SERVER ----------------
 */
// Server listens on http://localhost:3000
// console.log(path.join(__dirname,'/public'))
const Port =process.env.PORT ||3000;
app.listen(Port,() =>{
    console.log("server is litting 3000")
});