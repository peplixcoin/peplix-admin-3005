const express = require('express');
const { getStats, updateStats } = require('../controllers/statsController');
const router = express.Router();

// Route to get stats
router.get('/', getStats);

// Route to update stats
router.put('/', updateStats);

module.exports = router;
