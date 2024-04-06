const express = require('express');
const router = express.Router();
const user =require('../controllers/user/cread')
 
router.use('/', user); // Prefix all doctor routes with /doctor

module.exports = router;