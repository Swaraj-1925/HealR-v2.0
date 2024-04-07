const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

// const connectDB = require('./config/connectDB');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const doctorRoutes = require('./routes/doctor');


const session = require('express-session');
const MongoStore = require('connect-mongo');



const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable All CORS Requests (for development only)
app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your React frontend
}));

const username = process.env.Username_Mongodb;
const password = process.env.Password_Mongodb;
const DB_name = process.env.Name_Database_Mongodb;
var secret = process.env.Secret;
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: `mongodb+srv://${username}:${password}@cluster0.awcvfoh.mongodb.net/${DB_name}?retryWrites=true&w=majority` }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));



// routes
app.use('/', userRoutes); // Mount the router under /user base path
app.use('/doctor', doctorRoutes); // Mount the router under /doctor base path




const Port = process.env.PORT || 3000;
app.listen(Port, () => {
    console.log("server is listening on port " + Port);
});