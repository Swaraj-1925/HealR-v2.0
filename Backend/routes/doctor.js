const express = require('express');
const router = express.Router();
const doctor = require('./../controllers/doctor/cread');



router.use('/', doctor); // Prefix all doctor routes with /

module.exports = router;
