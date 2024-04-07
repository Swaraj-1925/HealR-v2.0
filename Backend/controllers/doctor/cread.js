const express = require('express');
const router = express.Router();


// auth
const genPassword = require('./../../config/passwordUtils').genPassword;

// monogdb
const connection = require('./../../config/db');
const Doctor = connection.models.Doctor;
const Credential = connection.models.Credential;

// passport js
const passport = require('passport');


router.post('/signup', async (req, res) => {
    const saltHash = genPassword(req.body.password);
    const hash = saltHash.hash;
    const salt = saltHash.salt;

    const existingUser = await Doctor.findOne({ username: req.body.username});
    if (existingUser) {
        return;
    }

    // Extract data from req.body
const {
    name,
    email,
    age,
    gender,
    
    yearOfExperience,
    proofExperience,
    profession,
    proofProfession,
    clinic,
    about,

    selectedTimes,
    imageSmall,
    imageBig
} = req.body;

// Create a new instance of the Doctor model
const newDoctor = new Doctor({
    name: name,
    username: email, // Assuming email is used as username
    age: parseInt(age), // Convert age to a number
    gender: gender,
    description: about, // Assuming 'about' corresponds to the description field
    acceptedTime: selectedTimes, // Assuming 'selectedTimes' corresponds to acceptedTime
    clinicLocation: clinic, // Assuming 'clinic' corresponds to clinicLocation
    experience: {
        years: parseInt(yearOfExperience), // Convert yearOfExperience to a number
        profession: profession
    },
    availability: 'public', // Assuming availability is set to 'public'
    image: {
        big: imageBig, // Assuming 'imageBig' corresponds to the big image
        small: imageSmall // Assuming 'imageSmall' corresponds to the small image
    },
    document: {
        experience: proofExperience, // Assuming 'proofExperience' corresponds to the experience document
        profession: proofProfession // Assuming 'proofProfession' corresponds to the profession document
    }
});

// Save the new doctor to the database
newDoctor.save()
    .then(savedDoctor => {
        console.log('New doctor saved:', savedDoctor);
        // Handle success
    })
    .catch(error => {
        console.error('Error saving doctor:', error);
        // Handle error
    });
    const newCredential = new Credential({
        username: email,
        password: {
            hash: hash,
            salt: salt,
        },
        type: "doctor",
        joiningDate: new Date()
    });
    
    newCredential.save()
    .then(savedCredential => {
        console.log('New doctor saved:', savedCredential);
        passport.authenticate("local")(req, res, function () {
            console.log("\nsignup successful\n");
        });
    })
    .catch(error => {
        console.error('Error saving doctor:', error);
        // Handle error
    });

});

module.exports = router;
