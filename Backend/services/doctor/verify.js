const express = require('express');
const router = express.Router();

const connection = require('./../../config/db');
const Doctor_verification = connection.models.Verification;

const uplode = require('../../config/bloob').VerifyUploadImg;
const deleteBlob = require('../../config/bloob').deleteBlob;

async function Verify(userData, userfiles) {
    
    const existingUser = await Doctor_verification.findOne({ username: userData.email, description: '' });
    const rejectedUser = await Doctor_verification.findOne({ username: userData.email, description: { $ne: "" } });
    
    if (existingUser) {
        throw new Error('Request already exists');
    } else if (rejectedUser) {
        const oldUrl = rejectedUser.document;
        
    
        await deleteBlob(oldUrl);
    
        const img = userfiles[0].fieldname;
        const buffer = userfiles[0].buffer;
        const link = await uplode(img, buffer)
    
        rejectedUser.profession = userData.profession;
        rejectedUser.document = link;
    
        await rejectedUser.save();
    } else {
        const img = userfiles[0].fieldname;
        const buffer = userfiles[0].buffer;
        const link = await uplode(img, buffer);
    
        const verification = new Doctor_verification({
            username: userData.email,
            profession: userData.profession,
            document: link
        });
    
        await verification.save();
    }
    
}
module.exports = Verify;