
const express = require('express');
const router = express.Router();

// auth
const genPassword = require('../../config/Password').genPassword;
const validPassword = require('../../config/Password').validPassword;


const connection = require('./../../config/db');
const Doctor = connection.models.Doctor;
const Credential = connection.models.Credential;
const Doctor_verification = connection.models.Verification;
const User = connection.models.User;

const secretKey = process.env.Secret;
const jwt = require('jsonwebtoken');

const uplode = require('./../../config/bloob').UploadImg;



async function appointments(req,res) {
 
     try {
        const doctorUsername = req.user;
        const appointmentData= await User.find({ 'appointments.doctorUsername': doctorUsername});
        
        // Check if users were found
        if (appointmentData.length === 0) {
            return res.status(404).json({ message: 'No appointments found for this doctor.' });
        }

        // Flatten appointments
        const appointments = [];
        appointmentData.forEach(user => {
            user.appointments.forEach(appointment => {
                if (appointment.doctorUsername === doctorUsername) {
                    appointments.push({
                        userId: user._id,
                        name: user.name,
                        username: user.patientUsername,
                        age: user.age,
                        gender: user.gender,
                        doctorUsername: appointment.doctorUsername,
                        appointmentType: appointment.appointmentType,
                        date: appointment.date,
                        time: appointment.time,
                    });
                }
            });
        });
        res.status(200).json(appointments);

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = appointments;
