const express = require('express');
 

const connection = require('./../../config/db');
 
const Doctor_req = connection.models.Verification

async function AcceptReq(userData, res) {
    try {
        const findDoc = await Doctor_req.findOneAndUpdate(
            { username: userData.username },
            { $set: { verified: 'accepted' } },
            
        );
        await findDoc.save(); 
        

        res.status(200).json({ message: 'successful'}); 
    } catch (error) {
        
        console.error('Error fetching doctors:', error);
        throw new Error('error while feacthing data',error.message);
    }

    
}
async function RejectReq(userData, res) {
    
    try {
        const findDoc = await Doctor_req.findOneAndUpdate(
            { username: userData.username },
            { $set: { description: userData.description } },
            
        );
        await findDoc.save(); 
        res.status(200).json({ message: 'successful'}); 
    } catch (error) {
        
        console.error('Error fetching doctors:', error);
        throw new Error('error while feacthing data',error.message);
    }
    
}


module.exports = {
    AcceptReq,
    RejectReq
};