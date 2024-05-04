
const DocVerifyReq = require('./../services/admin/doc_verification_req');
const AcceptReq = require('./../services/admin/handleRequest').AcceptReq;
const RejectReq = require('./../services/admin/handleRequest').RejectReq;
const dashStatus = require('./../services/admin/dashboard-status') ;
const Patient_list = require('../services/admin/admin-patient');

const Doctor_list = require('../services/admin/admin-doctor').Doctor_list;
const handle_Report = require('../services/admin/admin-doctor').handleReport;
const handle_Experience = require('../services/admin/admin-doctor').handleExperience;
const handle_Profession = require('../services/admin/admin-doctor').handleProfession;
const handle_Appointments = require('../services/admin/admin-doctor').handleAppointments;
const handle_Reviews = require('../services/admin/admin-doctor').handleReviews;




async function DocVerifyReqcontroller(req, res) {

    try {
        const userData = req.body;
        await DocVerifyReq(userData, res);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
}

async function AcceptReqcontroller(req, res) {
    try {
        const userData = req.body;
        await AcceptReq(userData, res);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }


}
async function RejectReqcontroller(req, res) {
    try {
        const userData = req.body;
        await RejectReq(userData, res);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }

}
async function dashboard_statusController(req, res) {
    try {
        const userData = req.body;
        await dashStatus(userData, res);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }

}
async function Patient_listController(req, res) {
    
    try {
        const userData = req.body;
        await Patient_list(userData, res);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }

}

async function Doctor_listController(req, res) {
    
    try {
        const userData = req.body;
        await Doctor_list(userData, res);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }

}
async function handle_ReportController(req, res) {
    
    try {
        const userData = req.query.username;
        await handle_Report(userData, res);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }

}
async function handle_ExperienceController(req, res) {
    
    try {
        const userData = req.query.username;
        await handle_Experience(userData, res);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }

}
async function handle_ProfessionController(req, res) {
    
    try {
        const userData = req.query.username;
        await handle_Profession(userData, res);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }

}
async function handle_AppointmentsController(req, res) {
    
    try {
        const userData = req.query.username;
        await handle_Appointments(userData, res);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }

}
async function handle_ReviewsController(req, res) {
    
    try {
        const userData = req.query.username;
        await handle_Reviews(userData, res);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }

}



module.exports = {
    DocVerifyReqcontroller,
    AcceptReqcontroller,
    RejectReqcontroller,
    dashboard_statusController,
    Patient_listController,

    Doctor_listController,
    handle_ReportController,
    handle_ExperienceController, 
    handle_ProfessionController,
    handle_AppointmentsController,
    handle_ReviewsController
};