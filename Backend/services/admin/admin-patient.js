const express = require('express');
const connection = require('../../config/db');

const Staff = connection.models.Staff;
const User = connection.models.User;
const Doctor = connection.models.Doctor;

async function Patient_list(userData, res) {
    
    try {
       
       const users = await User.find({}, '-_id name patientUsername age gender appointments reviews discord');

       res.status(200).json(users)
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
}

module.exports = Patient_list;
