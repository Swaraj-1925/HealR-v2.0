const Signup =require('./../services/doctor/auth')



async function Signupcontroller(req, res) {

    try {
        console.log(req)
        const userData = req.body;
        const userfiles = req.files;
        const user = await Signup(userData,userfiles);

        res.status(201).json({ message: "Successfully" });



    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    Signupcontroller,
    // Signincontroller,
    // Dashboardcontroller,
    // Bookappoinmet_Controller,
    // Doc_description_Controller
};