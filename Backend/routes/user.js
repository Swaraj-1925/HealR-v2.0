const express = require('express');
const router = express.Router();

const UserSignup = require('./../controllers/user').Signupcontroller;
const UserSignin = require('./../controllers/user').Signincontroller;
const UserDashboard = require('./../controllers/user').Dashboardcontroller;

const Bookappoinmet = require('./../controllers/user').Bookappoinmet_Controller;
const Doc_description = require('./../controllers/user').Doc_description_Controller;
const Doc_appoinmentdata = require('./../controllers/user').Doc_description_Appoinmentdata_Controller;
const Scheduleappointment = require('./../controllers/user').Doc_Schedule_appointment_Controller;

const auth = require('./../config/middleware');



router.post("/signup", UserSignup);
router.post("/signin", UserSignin);
router.get("/dashboard", auth, UserDashboard);

router.get("/bookappoinmet", Bookappoinmet);
router.get("/docDescription/:doctorId", Doc_description);
router.get("/docAppoinmentdata/:doctorId", Doc_appoinmentdata);

router.post("/docAppoinmentdatapost/:doctorId", auth,Scheduleappointment);

module.exports = router;
