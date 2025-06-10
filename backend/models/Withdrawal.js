const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  noOfTokens: { type: Number, required: true },
  value: { type: Number, required: true },
  requestedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'rejected', 'approved'], default: 'pending' },
  upiId: { type: String, required: true },
  utrNo: { type: String, default: '' },
  tid: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }  // Transaction ID reference
});

module.exports = mongoose.model('Withdrawal', withdrawalSchema);
