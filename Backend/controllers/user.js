const Signup = require("./../services/user/auth").Signup;
const Signin = require("./../services/user/auth").Signin;

const  UpdateUser  = require("../services/user/update").UpdateUser;
const  Delete_User  = require("../services/user/update").Delete_User;
const Dashboard = require("./../services/user/dashboard");

const Bookappoinmetpage = require("./../services/user/bookappoinment").Bookappoinmetpage;
const Doc_description = require("./../services/user/bookappoinment").Docdescription;
const Doc_appoinmentdata = require("./../services/user/bookappoinment").Docappoinmentdata;
const Scheduleappointment = require("./../services/user/bookappoinment").Scheduleappointment;
const RateDoctor = require("./../services/user/bookappoinment").RateDoctor;
const ReportDoctor = require("./../services/user/bookappoinment").ReportDoctor;





async function Signupcontroller(req, res) {
    try {
        const userData = req.body;
        const user = await Signup(userData);
        
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
        const appoinment = Bookappoinmetpage(req, res)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });

    }
}

async function Doc_description_Controller(req, res) {
    try {
        Doc_description(req, res)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });

    }
}
async function Doc_description_Appoinmentdata_Controller(req, res) {
    try {
        Doc_appoinmentdata(req, res)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });

    }
}
async function Doc_Schedule_appointment_Controller(req, res) {
    try {
        Scheduleappointment(req, res)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
}
 
async function Update_User_Controller(req, res) {
    const userData ={
        username:req.user,
        tochange:req.body.toChange,
        userdata:req.body.data,
    }
    try {
        UpdateUser(userData, res)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
}
async function Delete_account_Controller(req, res) {
    
    const userData =req.user;
        
    try {
        Delete_User(userData, res)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
}
async function RateDoctor_Controller(req, res) {
    
    const userData ={data:req.body, user:req.user};
        
    try {
        RateDoctor(userData, res)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
}
async function ReportDoctor_Controller(req, res) {
    
    const userData ={data:req.body, user:req.user};
        
    try {
       ReportDoctor(userData, res)
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
    Doc_description_Controller,
    Doc_description_Appoinmentdata_Controller,
    Doc_Schedule_appointment_Controller,
    Update_User_Controller,
    Delete_account_Controller,
    RateDoctor_Controller,
    ReportDoctor_Controller
};