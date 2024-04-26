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



async function Signup(userData, userfiles) {
    const img_small = userfiles[0].fieldname;
    const img_big = userfiles[1].fieldname;

    const buffer_small = userfiles[0].buffer;
    const buffer_big = userfiles[1].buffer;

    const link_small = await uplode(img_small, buffer_small)
    const link_big = await uplode(img_big, buffer_big) 
    
    const notVerified = await Doctor_verification.findOne({ username: userData.email, verified: "rejected", description: '' });
    if (notVerified) {
        throw new Error('not verified');
    }
    const rejected = await Doctor_verification.findOne({ username: userData.email, verified: "rejected", description: { $ne: "" } });
    if (rejected) {
        const message =rejected.description
        
        throw new Error(`rejected for resone :-  ${message}` );
    }
    
    const existingUser = await Credential.findOne({ username: userData.email, type: "doctor" });
    const accepted = await Doctor_verification.findOne({ username: userData.email, verified: "accepted"});
    if(!accepted){
        throw new Error('Request has not been accepetd yet or request dont exists');
    }
    if (existingUser) {
        throw new Error('User exists');
    }
    else {
        try {

            const newDoctor = new Doctor({
                name: userData.name,
                username: userData.email, 
                age: userData.age,
                gender: userData.gender,
                shortdescription: userData.points,
                description: userData.about,
                acceptedTime: userData.selectedTimes,
                clinicLocation: userData.clinic,
                experience: {
                    years: accepted.experience,
                    profession: accepted.profession,
                },
                fees: {
                    message: userData.feesMessage,
                    call: userData.feesCall,
                    videoCall: userData.feesVideoCall,
                    inClinic: userData.feesInRealLife

                },
                availability: 'public',
                image: {
                    small: link_small,
                    big: link_big,
                },
            });
            await newDoctor.save();
            const { salt, hash } = genPassword(userData.password);
            const newCredential = new Credential({
                username: userData.email,
                password: {
                    hash: hash,
                    salt: salt,
                },
                type: "doctor",
                joiningDate: new Date()
            });
            await newCredential.save();
        }
        catch (e) {
            console.log("doc auth", e)
            throw new Error('error while saving user ');
        }
    }

}


module.exports = Signup;