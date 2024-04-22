const express = require('express');
const router = express.Router();

const connection = require('./../../config/db');
const Doctor_verification = connection.models.Verification;

const uplode = require('../../config/bloob').VerifyUploadImg;
const deleteBlob = require('../../config/bloob').deleteBlob;

async function Verify(userData, userfiles) {
    
    console.log("userdata>",userData)
    console.log("userdata>",userfiles)
    const existingUser = await Doctor_verification.findOne({ username: userData.email, description: '' });
    const rejectedUser = await Doctor_verification.findOne({ username: userData.email, description: { $ne: "" } });
    
    if (existingUser) {
        throw new Error('Request already exists');
    } else if (rejectedUser) {

        const ProfessionProofOldUrl = rejectedUser.professionProof;
        const ExperienceProofOldUrl = rejectedUser.experienceProof;
        await deleteBlob(ProfessionProofOldUrl);
        await deleteBlob(ExperienceProofOldUrl);
    
        const imgExperienceProof = userfiles[0].fieldname;
        const bufferExperienceProof = userfiles[0].buffer;
        const linkExperienceProof = await uplode(imgExperienceProof, bufferExperienceProof)
    
        const imgProfessionProof = userfiles[1].fieldname;
        const bufferProfessionProof = userfiles[1].buffer;
        const linkProfessionProof = await uplode(imgProfessionProof, bufferProfessionProof)
    
        rejectedUser.profession = userData.profession;
        rejectedUser.yearOfExperience = userData.yearOfExperience;
        rejectedUser.experienceProof = linkExperienceProof;
        rejectedUser.professionProof = linkProfessionProof;
    
        await rejectedUser.save();
    } else {

        const imgExperienceProof = userfiles[0].fieldname;
        const bufferExperienceProof = userfiles[0].buffer;
        const linkExperienceProof = await uplode(imgExperienceProof, bufferExperienceProof)
    
        const imgProfessionProof = userfiles[1].fieldname;
        const bufferProfessionProof = userfiles[1].buffer;
        const linkProfessionProof = await uplode(imgProfessionProof, bufferProfessionProof)
    
        const verification = new Doctor_verification({
            username: userData.email,
            profession: userData.profession,
            experience:userData.yearOfExperience,
            experienceProof: linkExperienceProof,
            professionProof:linkProfessionProof
        });
    
        await verification.save();
    }
    
}
module.exports = Verify;