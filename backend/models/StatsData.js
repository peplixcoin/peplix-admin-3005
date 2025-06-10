const mongoose = require('mongoose');

const statsDataSchema = new mongoose.Schema({
    tokenValue: {
        type: Number,
        required: true,
    },
    totalInvestment: {
        type: Number,
        required: true,
    },
    profitPercent: {
        type: Number,
        required: true,
    },
    activeUsers: {
        type: Number,
        required: true,
    },
    tokenDescription: {
        type: String,
        required: true,
    },
    investmentDescription: {
        type: String,
        required: true,
    },
    profitDescription: {
        type: String,
        required: true,
    },
    usersDescription: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('StatsData', statsDataSchema);
