const express = require('express');
const router = express.Router();

// auth
const genPassword = require('../../config/Password').genPassword;
const validPassword = require('../../config/Password').validPassword;

// monogdb
const connection = require('./../../config/db');
const User = connection.models.User;
const Credential = connection.models.Credential;


const secretKey = process.env.Secret;
const jwt = require('jsonwebtoken');
 

async function Signup(userData) {
    const { name, username, password, age, gender, discord } = userData;
    const { salt, hash } = await genPassword(password);

    const existingUser = await Credential.findOne({ username: username, role: "patient" });
    if (existingUser) {

        throw new Error('User exists');
    }

    const newUser = new User({
        name: name,
        patientUsername: username,
        age: age,
        gender: gender,
        discord: discord,
    });
    const newCredential = new Credential({
        username: username,
        password: {
            hash: hash,
            salt: salt,
        },
        type: "patient",
        joiningDate: new Date()
    });

    const savedUser = await newUser.save();
    const savedCredential = await newCredential.save();

    return { savedUser, savedCredential };
}


async function Signin(userData, res) {
    const { username, password } = userData;
    const existingUser = await Credential.findOne({ username: username, type: "patient" });
    if (!existingUser) {
        throw new Error('User does not exist');
    } else {
        const isValid = validPassword(password, existingUser.password.hash, existingUser.password.salt);
        if (!isValid) {
            throw new Error('Invalid password');
        }
        const token = jwt.sign({ userId: existingUser._id, email: existingUser.username }, secretKey, { expiresIn: '3d' });

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1),
            httpOnly: true,
        }
        res.status(200).cookie('token', token, options).json({ message: "Successfully",token });
    }
    return existingUser;
}
module.exports = { Signup, Signin }