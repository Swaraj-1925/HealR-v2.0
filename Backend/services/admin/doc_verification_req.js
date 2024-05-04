const express = require('express');


const connection = require('./../../config/db');

const Doctor_req = connection.models.Verification


async function Doctor_verification(userData, res) {
    try {
        const verifiedreq = await Doctor_req.find({ verified: 'rejected', description: '' })
            .select('username profession experience document experienceProof professionProof');
        res.status(200).json(verifiedreq);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        throw new Error('Error while fetching data', error.message);
    }
}


module.exports = Doctor_verification;