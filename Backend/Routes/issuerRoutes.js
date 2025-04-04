const express = require('express');
const { profile ,uploadDocument} = require('../Controllers/issuerController');
const router = express.Router();
const {authenticateToken}= require('../Middleware/jwtauth');
const upload = require('../Middleware/upload'); // Adjust path as needed


// router.post('/issuer_dashbaord', dashboard);
router.post("/upload",authenticateToken,upload.single('file'),uploadDocument)
// router.post('/Issue', Issue_Document);
router.post("/Profile",authenticateToken,profile)

module.exports = router;