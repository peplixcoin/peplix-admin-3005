const Withdrawal = require('../models/Withdrawal');
const Transaction = require('../models/Transaction');

// Get all withdrawals
exports.getWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find().populate('userId', 'username');
    res.status(200).json(withdrawals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin approves or rejects a withdrawal
exports.handleWithdrawal = async (req, res) => {
  const { withdrawalId, action, utrNo } = req.body;

  try {
    const withdrawal = await Withdrawal.findById(withdrawalId);
    if (!withdrawal) {
      return res.status(404).json({ message: 'Withdrawal not found' });
    }

    const transaction = await Transaction.findById(withdrawal.tid);
    if (!transaction) {
      return res.status(404).json({ message: 'Associated transaction not found' });
    }

    if (action === 'approved') {
      if (withdrawal.noOfTokens > transaction.tokensAvailable) {
        return res.status(400).json({ message: 'Insufficient tokens available in the package.' });
      }

      if (!utrNo) {
        return res.status(400).json({ message: 'TXID number is required to approve the withdrawal.' });
      }

      transaction.tokensAvailable -= withdrawal.noOfTokens;
      transaction.tokensWithdrawn += withdrawal.noOfTokens;
      withdrawal.status = 'approved';
      withdrawal.utrNo = utrNo;
    } else if (action === 'rejected') {
      withdrawal.status = 'rejected';
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    await transaction.save();
    await withdrawal.save();

    res.status(200).json({ message: `Withdrawal ${action} successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};