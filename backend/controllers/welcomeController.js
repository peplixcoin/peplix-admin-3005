const User = require('../models/User');
const Withdrawal = require('../models/Withdrawal');
const WalletWithdraw = require('../models/Walletwithdraw');

// Fetch and calculate the values for the welcome page
exports.getWelcomeStats = async (req, res) => {
  try {
    const totalInvestmentLifetime = await User.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmountInvested' } } }
    ]);

    const totalWithdrawnLifetime = await Withdrawal.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: null, total: { $sum: '$value' } } }
    ]);

    const totalWalletWithdraws = await WalletWithdraw.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: null, total: { $sum: '$withdrawAmount' } } }
    ]);

    const totalWalletLifetime = await User.aggregate([
      { $group: { _id: null, total: { $sum: '$walletrecord' } } }
    ]);

    const currentInvestment = (totalInvestmentLifetime[0]?.total || 0) -
      (totalWithdrawnLifetime[0]?.total || 0) -
      (totalWalletWithdraws[0]?.total || 0);

    res.status(200).json({
      totalInvestmentLifetime: totalInvestmentLifetime[0]?.total || 0,
      totalWithdrawnLifetime: totalWithdrawnLifetime[0]?.total || 0,
      totalWalletWithdraws: totalWalletWithdraws[0]?.total || 0,
      totalWalletLifetime: totalWalletLifetime[0]?.total || 0,
      currentInvestment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
};
