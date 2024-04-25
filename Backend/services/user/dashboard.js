const connection = require('./../../config/db');
const User = connection.models.User;
const Doctor = connection.models.Doctor;

async function Dashboard(req, res) {
    try {
        const existingUser = await User.findOne({ patientUsername: req.user });

        if (!existingUser) {
            throw new Error('User not found');
        }

        let closestAppointment = null;
        const today = new Date();

        // Find the closest appointment for the user
        existingUser.appointments.forEach(appointment => {
            const appointmentDate = new Date(appointment.date);
            if (appointmentDate >= today) {
                if (!closestAppointment || appointmentDate < new Date(closestAppointment.date)) {
                    closestAppointment = appointment;
                }
            }
        });
        if (closestAppointment) {
            const doctor = await Doctor.findOne({ username: closestAppointment.doctorUsername });
            console.log(doctor)
            const docObj = {
                docname:doctor.name,
                appointmentType:closestAppointment.appointmentType,
                date:closestAppointment.date,
                time:closestAppointment.time,
                docImg: doctor ? doctor.image.small : null
            };

            res.json({ user: existingUser.name, docObj });
        } else {
            res.json({ user: existingUser.name, docObj: null }); // No appointment, send null docObj
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = Dashboard;
