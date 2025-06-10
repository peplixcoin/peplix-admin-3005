const express = require('express');
const { getWithdrawals, handleWithdrawal } = require('../controllers/withdrawController');

const router = express.Router();

// Route to get all withdrawals
router.get('/', getWithdrawals);

// Route to handle withdrawal approval/rejection
router.post('/handle', handleWithdrawal);

module.exports = router;
