const Transaction = require('../models/Transaction');
const User = require('../models/User');
const calculateCommission = require('../utils/commissionCalculator');
const { updateTokensAvailable } = require('./TransactionController');


// Get all transactions
exports.getAllTransactionsForAdmin = async (req, res) => {
  try {
      const transactions = await Transaction.find().populate('userId', 'username');
      res.status(200).json(transactions);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
};

// Get pending transactions
exports.getPendingTransactions = async (req, res) => {
  try {
      const pendingTransactions = await Transaction.find({ status: 'pending' }).populate('userId', 'username');
      res.status(200).json(pendingTransactions);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching pending transactions', error: error.message });
  }
};




// Helper function to distribute commissions after package purchase
const distributeCommissions = async (sponsorUsername, packageAmount) => {
  let sponsor = await User.findOne({ username: sponsorUsername });
  if (sponsor) {
      let relativeLevel = 0;  // Start from the direct referrer (relative level 0)

      while (sponsor && sponsor.level >= 0) {
          const commission = calculateCommission(relativeLevel, packageAmount);
          sponsor.wallet += parseFloat(commission.toFixed(2));  // Ensure precise value
          sponsor.walletrecord += parseFloat(commission.toFixed(2));  // Record the commission
          await sponsor.save();

          // Break the loop if we've reached the root user (level 0 or no sponsor)
          if (sponsor.level === 0 || !sponsor.sponsor) {
              break;
          }
          sponsor = await User.findOne({ username: sponsor.sponsor });  // Move up the hierarchy
          relativeLevel++;  // Increase the relative level as we move up
      }
  }
};


// Approve or Reject a transaction
exports.approveTransaction = async (req, res) => {
  const { transactionId, action } = req.body; // Add 'action' to specify 'approve' or 'reject'

  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    if (transaction.status === 'approved' || transaction.status === 'rejected') {
      return res.status(400).json({ message: `Transaction is already ${transaction.status}` });
    }

    if (action === 'approved') {
      // Approve the transaction
      transaction.status = 'approved';
      await transaction.save();

      // Find the user and update their investment and tokenWallet
      const user = await User.findById(transaction.userId);
      user.totalAmountInvested += transaction.packagePrice;
      user.packages.push(transaction.packagePrice);
      await user.save();

      // Distribute commissions to the user's sponsor, if applicable
      if (user.sponsor) {
        await distributeCommissions(user.sponsor, transaction.packagePrice);
      }

      await updateTokensAvailable(transaction._id);

      res.status(200).json({ message: 'Transaction approved successfully' });

    } else if (action === 'rejected') {
      // Reject the transaction
      transaction.status = 'rejected';
      await transaction.save();

      res.status(200).json({ message: 'Transaction rejected successfully' });

    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error processing transaction.', error: error.message });
  }
};


// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Get user by username
exports.getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
};

// Update user by ID
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

