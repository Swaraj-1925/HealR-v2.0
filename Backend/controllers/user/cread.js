const express = require('express');
const router = express.Router();

// auth
const genPassword = require('./../../config/passwordUtils').genPassword;


// monogdb
const connection = require('./../../config/db');
const User = connection.models.User;
const Credential = connection.models.Credential;

// passport js
const passport = require('passport');



router.post('/signup', async (req, res) => {
    // get salt and hash
    const saltHash = genPassword(req.body.password);
    const hash = saltHash.hash;
    const salt = saltHash.salt;

    // check for excting account
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        return;
    }

    const newUser = new User({
        name: req.body.name,
        patientUsername: req.body.username,
        age: req.body.age,
        gender: req.body.gender,
        discord: req.body.discord,
    });
    const newCredential = new Credential({
        username: req.body.username,
        password: {
            hash: hash,
            salt: salt,
        },
        type: "patient",
        joiningDate: new Date()
    });
    try {
        await newUser.save();
        await newCredential.save();
        console.log('New User saved:', newUser);
        console.log('New Credential saved:', newCredential);
        passport.authenticate("local")(req, res, function () {
            console.log("\nsignup successful\n");
            res.status(200).json({ message: 'Signup successful!' });
        });
    } catch (error) {
        console.error('Error saving user or credential:', error);
        res.status(500).json({ message: 'Signup failed' });
    }

});

router.post('/signin', async (req, res) => {
    const existingUser = await Credential.findOne({ username: req.body.username, type: "patient" });
    if (!existingUser) {
        console.log("acount dont exsit");
        return;
    }
    console.log("acount exsit");

    passport.authenticate('local', (err, user, info) => {

        if (err) {

            return next(err);
        }
        if (!user) {

            return res.send('Invalid credentials');
        }
        req.logIn(user, (err) => {
            if (!user) {

                // return res.send('Invalid credentials');
                console.log("signup faild")
            }

            if (err) {
                return next(err);
            }
            console.log("signup done")
        });
    });

});


module.exports = router;
