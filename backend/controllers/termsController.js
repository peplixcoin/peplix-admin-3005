const Terms = require('../models/terms');

// Fetch the current terms and conditions (only one document)
exports.getTerms = async (req, res) => {
    try {
        const terms = await Terms.findOne(); // Find the first document
        if (!terms) {
            return res.status(404).json({ message: 'Terms not found' });
        }
        return res.status(200).json(terms);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to fetch terms' });
    }
};

// Update the terms and conditions
exports.updateTerms = async (req, res) => {
    const { paragraph } = req.body;

    try {
        let terms = await Terms.findOne(); // Find the first document

        if (!terms) {
            // If no document exists, create a new one
            terms = new Terms({ paragraph });
            await terms.save();
        } else {
            // Update the existing document
            terms.paragraph = paragraph;
            await terms.save();
        }

        return res.status(200).json({ message: 'Terms updated successfully', terms });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to update terms' });
    }
};
