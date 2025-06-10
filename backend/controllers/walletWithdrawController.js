const WalletWithdraw = require('../models/Walletwithdraw');
const User = require('../models/User');


// Fetch all wallet withdrawals for admin view
exports.getAllWalletWithdraws = async (req, res) => {
    try {
        const withdrawals = await WalletWithdraw.find().sort({ requestedAt: -1 }); // Sorted by latest requests
        return res.status(200).json(withdrawals);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to fetch wallet withdrawals.' });
    }
};

// Approve or Reject Wallet Withdraw Request
exports.updateWithdrawStatus = async (req, res) => {
    const { withdrawId, status, utrNo } = req.body;

    try {
        const withdrawal = await WalletWithdraw.findById(withdrawId);

        if (!withdrawal) {
            return res.status(404).json({ message: 'Withdrawal not found.' });
        }

        if (status === 'approved') {
            // Find the user associated with the withdrawal
            const user = await User.findById(withdrawal.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            // Check if the user has sufficient balance
            if (user.wallet < withdrawal.withdrawAmount) {
                return res.status(400).json({ message: 'Insufficient wallet balance.' });
            }

            // Deduct the withdrawal amount from the user's wallet
            user.wallet -= withdrawal.withdrawAmount;
            await user.save();

            // Update the withdrawal with the approved status and UTR number
            withdrawal.status = 'approved';
            withdrawal.utrNo = utrNo;
            await withdrawal.save();

            return res.status(200).json({ message: 'Withdrawal approved successfully.' });
        } else if (status === 'rejected') {
            // Update the status to rejected
            withdrawal.status = 'rejected';
            await withdrawal.save();

            return res.status(200).json({ message: 'Withdrawal rejected successfully.' });
        } else {
            return res.status(400).json({ message: 'Invalid status.' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to update withdrawal status.' });
    }
};
