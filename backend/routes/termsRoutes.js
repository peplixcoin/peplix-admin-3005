const express = require('express');
const router = express.Router();
const Terms = require('../models/terms');

// Get the existing terms (there will be only one document)
router.get('/terms', async (req, res) => {
    try {
        const terms = await Terms.findOne();
        if (!terms) {
            return res.status(404).json({ message: 'Terms not found' });
        }
        res.json(terms);
    } catch (error) {
        console.error('Error fetching terms:', error); // Added console logging for error
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update the terms
router.put('/terms', async (req, res) => {
    const { paragraph } = req.body;
    try {
        let terms = await Terms.findOne();
        if (!terms) {
            // Create a new document if it doesn't exist
            terms = new Terms({ paragraph });
        } else {
            // Update the existing document
            terms.paragraph = paragraph;
        }
        await terms.save();
        res.json({ message: 'Terms updated successfully' });
    } catch (error) {
        console.error('Error updating terms:', error); // Added console logging for error
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
