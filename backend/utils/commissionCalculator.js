// commissionCalculator.js
const calculateCommission = (relativeLevel, packageAmount) => {
    let commission = 0;
    
    if (relativeLevel === 0) {
        // Direct referrer gets 7%
        commission = packageAmount * 0.07;
    } else if (relativeLevel === 1) {
        // The user directly above the referrer gets 3%
        commission = packageAmount * 0.03;
    } else if (relativeLevel === 2) {
        // The user two levels above the referrer gets 2%
        commission = packageAmount * 0.02;
    } else {
        // All remaining users up to the root get 1%
        commission = packageAmount * 0.01;
    }
    
    // Fix floating-point issues
    return parseFloat(commission.toFixed(2));
};

module.exports = calculateCommission;