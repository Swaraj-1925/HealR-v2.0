const express = require('express');
 

const connection = require('./../../config/db');
 
const Doctor_req = connection.models.Verification


async function Doctor_verification(userData, res) {
    try {
        const verifiedreq = await Doctor_req.find({ verified: 'rejected' }).select('username profession document');;
        console.log(verifiedreq)
        res.status(200).json(verifiedreq); 
    } catch (error) {
        
        console.error('Error fetching doctors:', error);
        throw new Error('error while feacthing data',error.message);
    }

}

module.exports = Doctor_verification;