const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },  // Added phone number
    sponsor: { type: String },  // Sponsor's username
    referrals: [{ type: String }],  // Referrals by username
    level: { type: Number, default: 0 },
    walletrecord: {type: Number, default: 0},
    wallet: { type: Number, default: 0 },  // Wallet to hold commission
    totalAmountInvested: { type: Number, default: 0 },  // Track total amount invested
    tokenWallet: { type: Number, default: 0 },
    packages: [{ type: Number }],  // Array to store all purchased packages
    // Add the fields for password reset functionality
    resetPasswordToken: { type: String },  // Token for password reset
    resetPasswordExpire: { type: Date },  // Expiry time for the reset token
});


module.exports = mongoose.model("User", userSchema, "users");
