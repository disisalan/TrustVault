const express = require('express');
const { profile ,uploadDocument,v_doc, docs} = require('../Controllers/issuerController');
const router = express.Router();
const {authenticateToken}= require('../Middleware/jwtauth');
const upload = require('../Middleware/upload'); // Adjust path as needed
const { Verify } = require('crypto');


// router.post('/issuer_dashbaord', dashboard);
router.post("/upload",authenticateToken,upload.single('file'),uploadDocument)
router.post('/verify', v_doc);
router.post("/Profile",authenticateToken,profile)
router.get('/bulkDocuments', authenticateToken,docs)
   
module.exports = router;