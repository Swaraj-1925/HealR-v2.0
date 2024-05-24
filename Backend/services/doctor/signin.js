
const express = require('express');
const router = express.Router();

// auth
const genPassword = require('../../config/Password').genPassword;
const validPassword = require('../../config/Password').validPassword;


const connection = require('./../../config/db');
const Doctor = connection.models.Doctor;
const Credential = connection.models.Credential;
const Doctor_verification = connection.models.Verification;


const secretKey = process.env.Secret;
const jwt = require('jsonwebtoken');

const uplode = require('./../../config/bloob').UploadImg;



async function Signin(req,res) {
    const password =req.body.password
    const  existingUser = await Credential.findOne({ username: req.body.username });
    if (!existingUser) {
        throw new Error('not verified');
    }
    else {
        try {
            const isValid = validPassword(password, existingUser.password.hash, existingUser.password.salt);
            if (!isValid) {
                throw new Error('Invalid password');
            }
            const token = jwt.sign({ userId: existingUser._id }, secretKey, { expiresIn: '3d' });

            res.status(200).cookie('token', token).json({ message: "Successfully",token });
        }
        catch (e) {
            //console.log("doc auth", e)
            throw new Error('error while saving user ');
        }
    }

}


module.exports = Signin;
