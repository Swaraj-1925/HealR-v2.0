const express = require('express');
const router = express.Router();

const connection = require('./../../config/db');
const Doctor_verification = connection.models.Verification;

const uplode = require('./../../config/uplodeimg').VerifyUploadImg;

async function Verify(userData, userfiles) {
    console.log("userdata>>>>>>>",userData);
    console.log("userfile>>>>>>>",userfiles);
    const img = userfiles[0].fieldname;
    const buffer = userfiles[0].buffer;
    const link = await uplode(img, buffer)

    const existingUser = await Doctor_verification.findOne({ username: userData.email  });
    if(existingUser){
        throw new Error('request exists');
    }else{
        const verification = new Doctor_verification({
            username: userData.email, 
            profession: userData.profession,
            document:link
        });

        await verification.save();
    }

}
module.exports = Verify;