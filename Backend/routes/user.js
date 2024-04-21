const express = require('express');
const router = express.Router();

const UserSignup = require('./../controllers/user').Signupcontroller;
const UserSignin = require('./../controllers/user').Signincontroller;
const UserDashboard = require('./../controllers/user').Dashboardcontroller;
const UpdateUser   = require('./../controllers/user').Update_User_Controller;

const Bookappoinmet = require('./../controllers/user').Bookappoinmet_Controller;
const Doc_description = require('./../controllers/user').Doc_description_Controller;
const Doc_appoinmentdata = require('./../controllers/user').Doc_description_Appoinmentdata_Controller;
const Scheduleappointment = require('./../controllers/user').Doc_Schedule_appointment_Controller;

const auth = require('./../config/middleware');
const Logout = require('./../controllers/user').Logout_Controller;
const Delete_account = require('./../controllers/user').Delete_account_Controller;



router.post("/signup", UserSignup);
router.post("/signin", UserSignin);
router.post("/updateData",auth, UpdateUser);
router.get("/dashboard", auth, UserDashboard);

router.get("/bookappoinmet",auth, Bookappoinmet);
router.get("/docDescription/:doctorId",auth, Doc_description);
router.get("/availableTimeSlots/:doctorId",auth, Doc_appoinmentdata);

router.post("/docAppoinmentdatapost/:doctorId", auth,Scheduleappointment);
router.post("/logout", auth,Logout);
router.post("/Delete_account", auth,Delete_account);

module.exports = router;
