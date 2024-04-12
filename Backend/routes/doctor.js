const express = require('express');
const router = express.Router();

const DocSignup = require('./../controllers/doctor').Signupcontroller;
const DocVerify = require('./../controllers/doctor').Verifycontroller

const auth = require('./../config/middleware');



router.post("/signup", DocSignup );
router.post("/verify", DocVerify );

module.exports = router;