// routes/userRoutes.js
const express = require('express');
const {
    getAllUsers,
    getUserByUsername,
    updateUser,
    getAllTransactionsForAdmin,
    getPendingTransactions,
    approveTransaction,
    getAllAdminWalletWithdraws,
    approveAdminWalletWithdraw,
    rejectAdminWalletWithdraw
} = require('../controllers/userController');

const {
    withdrawWalletAmount,
    getAllWalletWithdraws,
    updateWithdrawStatus
} = require('../controllers/walletWithdrawController');

const { 
    addNotification, 
    getAllNotifications, 
    updateNotification, 
    deleteNotification 
} = require('../controllers/notificationController');

const router = express.Router();

// Notification Routes
router.post('/addnotification', addNotification);  
router.get('/notifications', getAllNotifications);  
router.put('/notifications/:id', updateNotification);  
router.delete('/notifications/:id', deleteNotification);  

// Wallet Withdrawal Routes - Move above any dynamic routes
router.get('/walletwithdrawals', getAllWalletWithdraws); // Admin view for wallet withdrawals
router.post('/walletwithdrawals-yupdate', updateWithdrawStatus); // Update withdrawal status

// Routes for transactions (no /admin prefix)
router.get('/all-transactions', getAllTransactionsForAdmin);
router.get('/pending-transactions', getPendingTransactions);
router.post('/approve-transaction', approveTransaction);

// Get all users
router.get('/', getAllUsers);

// Dynamic route for user by username
router.get('/:username', getUserByUsername);

// Update user by ID
router.put('/:id', updateUser);

module.exports = router;
