const express = require('express');
const connection = require('./../../config/db');

const Staff = connection.models.Staff;
const User = connection.models.User;
const Doctor = connection.models.Doctor;

async function Dashboard_status(userData, res) {
    try {
        const countStaff = await Staff.countDocuments();
        const countUser = await User.countDocuments();
        const countDoctor = await Doctor.countDocuments();
        const countAppointments = 7;  

        const data = {
            staff: countStaff,
            User: countUser,
            doctor: countDoctor,
            appointments: countAppointments
        };

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
}

module.exports = Dashboard_status;
