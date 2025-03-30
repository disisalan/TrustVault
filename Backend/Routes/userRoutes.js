const express = require('express');

// Make sure you have defined or imported these functions:
const { dashboard, profile } = require('../Controllers/userController');
const {authenticateToken}= require('../Middleware/jwtauth');

const router = express.Router();
router.get('/dashboard', authenticateToken,dashboard);
router.get('/profile', authenticateToken, profile);   

module.exports = router;