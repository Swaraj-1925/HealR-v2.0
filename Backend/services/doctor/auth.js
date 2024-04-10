const express = require('express');
const router = express.Router();

// auth
const genPassword = require('../../config/Password').genPassword;
const validPassword = require('../../config/Password').validPassword;


const connection = require('./../../config/db');
const Doctor = connection.models.Doctor;
const Credential = connection.models.Credential;


const secretKey = process.env.Secret;
const jwt = require('jsonwebtoken');

const uplode = require('./../../config/uplodeimg');



async function Signup(userData, userfiles) {


    console.log(userData)
    const img_small = userfiles[0].fieldname;
    const img_big = userfiles[1].fieldname;
    const img_experience = userfiles[2].fieldname;
    const img_profession = userfiles[3].fieldname;

    const buffer_small = userfiles[0].buffer;
    const buffer_big = userfiles[1].buffer;
    const buffer_experience = userfiles[2].buffer;
    const buffer_profession = userfiles[3].buffer;

    const link_small = await uplode(img_small, buffer_small)
    const link_big = await uplode(img_big, buffer_big)
    const link_experience = await uplode(img_experience, buffer_experience)
    const link_profession = await uplode(img_profession, buffer_profession)

    const existingUser = await Credential.findOne({ username: userData.email, type: "doctor" });
    if (existingUser) {

        throw new Error('User exists');
    } else {
        try {

            const newDoctor = new Doctor({
                name: userData.name,
                username: userData.email, // Assuming email is used as username
                age: userData.age,
                gender: userData.gender,
                shortdescription: userData.points,
                description: userData.about,
                acceptedTime: userData.selectedTimes,
                clinicLocation: userData.clinic,
                experience: {
                    years: userData.yearOfExperience,
                    profession: userData.profession,
                },
                availability: 'public',
                image: {
                    small: link_small,
                    big: link_big,
                },
                document: {
                    experience: link_experience,
                    profession: link_profession,
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
        } catch (e) {
            console.log("doc auth", e)
            throw new Error('error while saving user ');
        }
    }

}


module.exports = Signup;