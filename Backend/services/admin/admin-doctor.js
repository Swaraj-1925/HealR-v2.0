const express = require('express');
const connection = require('../../config/db');

const Doctor = connection.models.Doctor;
const User = connection.models.User;
const Report = connection.models.Report;

async function Doctor_list(userData, res) {
    try {
        const doctors = await Doctor.find({}, '-_id name username age gender experience fees');

        const doctorData = await Promise.all(doctors.map(async (doctor) => {
            const appointmentsCount = await User.aggregate([
                { $match: { 'appointments.doctorUsername': doctor.username } },
                { $project: { appointments: 1 } },
                { $unwind: '$appointments' },
                { $group: { _id: null, count: { $sum: 1 } } }
            ]);

            const reviewsCount = await User.aggregate([
                { $match: { 'reviews.doctorUsername': doctor.username } },
                { $project: { reviews: 1 } },
                { $unwind: '$reviews' },
                { $group: { _id: null, count: { $sum: 1 } } }
            ]);

            const appointments = appointmentsCount.length > 0 ? appointmentsCount[0].count : 0;
            const reviews = reviewsCount.length > 0 ? reviewsCount[0].count : 0;
            const reports = await Report.countDocuments({ dusername: doctor.username });

            return {
                ...doctor.toObject(),
                appointments,
                reviews,
                reports
            };
        }));

       
        res.status(200).json(doctorData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
}

module.exports = Doctor_list;
