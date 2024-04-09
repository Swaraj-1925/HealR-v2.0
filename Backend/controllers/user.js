const Signup = require("./../services/user/auth").Signup;
const Signin = require("./../services/user/auth").Signin;

const Dashboard = require("./../services/user/dashboard");




async function Signupcontroller(req, res) {

    try {
        const userData = req.body;
        const user = await Signup(userData);
        // console.log("\ncreated user:- \n", user);
        res.status(201).json({ message: "Successfully" });



    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: error });
    }
}

async function Signincontroller(req, res) {

    try {
        const userData = req.body;
        const user = await Signin(userData, res);
        // console.log(user);

    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: error });
    }
}

async function Dashboardcontroller(req, res) {
    try {
        const dash =Dashboard(req,res)


    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error });

    }
}

module.exports = { Signupcontroller, Signincontroller, Dashboardcontroller };