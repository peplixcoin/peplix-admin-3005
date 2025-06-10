const express = require('express');
const { getWelcomeStats } = require('../controllers/welcomeController');
const router = express.Router();

// Route for welcome stats
router.get('/welcome-stats', getWelcomeStats);

module.exports = router;
