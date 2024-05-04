const express = require('express');
const router = express.Router();
 
const DocVerifyReq = require('./../controllers/admin').DocVerifyReqcontroller;
const AcceptReq = require('./../controllers/admin').AcceptReqcontroller;
const RejectReq = require('./../controllers/admin').RejectReqcontroller;
const status = require('./../controllers/admin').dashboard_statusController;
const Patient_list = require('./../controllers/admin').Patient_listController;

const Doctor_list = require('./../controllers/admin').Doctor_listController;
const handle_Report = require('./../controllers/admin').handle_ReportController;
const handle_Experience = require('./../controllers/admin').handle_ExperienceController;
const handle_Profession = require('./../controllers/admin').handle_ProfessionController;
const handle_Appointments = require('./../controllers/admin').handle_AppointmentsController;
const handle_Reviews = require('./../controllers/admin').handle_ReviewsController;
 
 



router.get("/docverication", DocVerifyReq ); 
router.put("/acceptReq", AcceptReq );
router.put("/rejectReq", RejectReq );
router.get("/dashboard", status );
router.get("/Patient_list", Patient_list );

router.get("/Doctor_list", Doctor_list );
router.get("/Doctor_Report", handle_Report );
router.get("/Doctor_Experience", handle_Experience );
router.get("/Doctor_Profession", handle_Profession );
router.get("/Doctor_Appointments", handle_Appointments );
router.get("/Doctor_Reviews", handle_Reviews );

module.exports = router;