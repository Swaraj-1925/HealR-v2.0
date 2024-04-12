const Signup = require("./../services/user/auth").Signup;
const Signin = require("./../services/user/auth").Signin;

const Dashboard = require("./../services/user/dashboard");
const Bookappoinment = require("./../services/user/bookappoinment").Bookappoinmet;
const Doc_description = require("./../services/user/bookappoinment").Docdescription;
 




async function Signupcontroller(req, res) {

    try {
        const userData = req.body;
        const user = await Signup(userData);
        // console.log("\ncreated user:- \n", user);
        res.status(201).json({ message: "Successfully" });



    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: error.message });
    }
}

async function Signincontroller(req, res) {

    try {
        const userData = req.body;
        const user = await Signin(userData, res);
        // console.log(user);

    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: error.message });
    }
}

async function Dashboardcontroller(req, res) {
    try {
        const dash = Dashboard(req, res)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });

    }
}

async function Bookappoinmet_Controller(req, res) {
    try {
        const appoinment = Bookappoinment(req, res)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });

    }
}
async function Doc_description_Controller(req, res) {
    try {
        const doc_description = Doc_description(req,res)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });

    }
}



module.exports = {
    Signupcontroller,
    Signincontroller,
    Dashboardcontroller,
    Bookappoinmet_Controller,
    Doc_description_Controller
};