const Transaction = require('../models/Transaction');
const User = require('../models/User');

const updateTokensAvailable = async (transactionId) => {
    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
        return;
    }

    // Check if the stacking period has already ended
    const endDate = new Date(transaction.dateandtime);
    endDate.setDate(endDate.getDate() + transaction.stackingPeriod);
    const currentDate = new Date();

    if (currentDate > endDate) {
        return;
    }

    const lastUpdated = new Date(transaction.lastUpdated);
    const hoursSinceLastUpdate = Math.abs(currentDate - lastUpdated) / 36e5;

    // Check if 24 hours have passed since the last update
    if (hoursSinceLastUpdate >= 24) {
        const tokensPerDay = transaction.tokens / transaction.stackingPeriod;
        const daysSinceLastUpdate = Math.floor(hoursSinceLastUpdate / 24);

        // Calculate how many tokens to add
        const tokensToAdd = tokensPerDay * daysSinceLastUpdate;

        // Update tokensAvailable but ensure it doesn't exceed the total tokens
        transaction.tokensAvailable = Math.min(
            transaction.tokensAvailable + tokensToAdd,
            transaction.tokens
        );

        // Update lastUpdated date to current date
        transaction.lastUpdated = currentDate;

        await transaction.save();
    }
};

module.exports = { updateTokensAvailable };