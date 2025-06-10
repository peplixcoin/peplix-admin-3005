const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  packageName: { type: String, required: true },
  packagePrice: { type: Number, required: true },
  tokens: { type: Number, required: true },
  tokensWithdrawn: { type: Number, default: 0 },
  tokensAvailable: { type: Number, default: 0 },
  min_tokens_req: { type: Number, required: false },
  stackingPeriod: { type: Number, required: true },
  utr: { type: String, default: null },
  dateandtime: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'rejected', 'approved'], default: 'pending' }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
