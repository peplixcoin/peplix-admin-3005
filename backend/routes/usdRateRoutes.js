// routes/usdRateRoutes.js
const express = require('express');
const { updateUsdRate, getUsdRate } = require('../controllers/usdRateController');
const router = express.Router();

// Route to fetch the current USD rate from the database
router.get('/usd-rate', getUsdRate);

// Route to refresh the USD to INR rate by fetching from the external API
router.post('/refresh-usd-rate', updateUsdRate);

module.exports = router;
