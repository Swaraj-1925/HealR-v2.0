const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
var passport = require('passport');
const fileUpload = require('express-fileupload');
var routes = require('./Routes');
const MongoStore = require('connect-mongo');
require('dotenv').config();



const username =process.env.usernameMonog;
const password=process.env.passwordMonog;

var app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
var  secret=process.env.SECRET
app.use(fileUpload());
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: `mongodb+srv://${username}:${password}@cluster0.awcvfoh.mongodb.net/Healr?retryWrites=true&w=majority`
    ,ttl: 60 * 60 * 24,    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 
    }
}));



require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
   
    next();
});
app.use(express.static(path.join(__dirname,'/public')));

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);



const Port =process.env.PORT ||3000;
app.listen(Port,() =>{
    console.log("server is litting 3000")
});