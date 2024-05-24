const Signup = require('./../services/doctor/auth')
const Signin = require('./../services/doctor/signin')
const Verify = require('./../services/doctor/verify')
const Appointments= require('./../services/doctor/appointments.js')




async function Verifycontroller(req, res) {

    try {

        const userData = req.body;
        const userfiles = req.files;
        await Verify(userData, userfiles ,res);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
}


async function Signupcontroller(req, res) {

    try {
        const userData = req.body;
        const userfiles = req.files;
        await Signup(userData, userfiles);
        res.status(201).json({ message: "Successfully" });

    } catch (error) {

        console.error(error);
        let errorMessage = "An error occurred while signing up";
        if (error.message === "not verified") {
            errorMessage = "User not verified";
        } else if (error.message.startsWith("rejected")) {
            errorMessage = error.message;
        } else if (error.message === "User exists") {
            errorMessage = "User already exists";
        } else {
            errorMessage = error.message;
        }
        res.status(400).json({ message: errorMessage })
    }
}

async function Signincontroller(req, res) {

    try {
        await Signin(req,res);
        //res.status(201).json({ message: "successfully" });

    } catch (error) {
        //console.log(error)
        //console.error(error);
        res.status(200).json({ message: error })
    }
}

async function Appointmentscontroller(req ,res) {
    try {
        await Appointments(req ,res);
    } catch (e) {
        res.status(200).json({ message: e })
    }
    
}
module.exports = {
    Signupcontroller,
    Signincontroller,
    Verifycontroller,
     Appointmentscontroller
    // Dashboardcontroller,
    // Bookappoinmet_Controller,
    // Doc_description_Controller
};
