const StatsData = require('../models/StatsData');

// Get the only StatsData object
const getStats = async (req, res) => {
    try {
        const stats = await StatsData.findOne();
        if (!stats) {
            return res.status(404).json({ message: 'Stats data not found' });
        }
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update StatsData object
const updateStats = async (req, res) => {
    try {
        const updatedStats = await StatsData.findOneAndUpdate({}, req.body, { new: true });
        if (!updatedStats) {
            return res.status(404).json({ message: 'Stats data not found' });
        }
        res.json(updatedStats);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getStats, updateStats };
