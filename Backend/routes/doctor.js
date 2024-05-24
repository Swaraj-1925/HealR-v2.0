const express = require('express');
const router = express.Router()

const DocSignup = require('./../controllers/doctor').Signupcontroller;
const DocSignin = require('./../controllers/doctor').Signincontroller;
const DocVerify = require('./../controllers/doctor').Verifycontroller
const List_appointments = require('./../controllers/doctor').Appointmentscontroller
const auth = require('./../config/middleware');



router.post("/signup", DocSignup );
router.post("/signin", DocSignin);
router.post("/verify", DocVerify );
router.get("/list_appointments",auth,List_appointments );


module.exports = router;
