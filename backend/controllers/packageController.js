const Package = require('../models/Package');

// Get all packages
const getPackages = async (req, res) => {
    try {
        const packages = await Package.find(); // Fetch all packages
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching packages' });
    }
};

// Add a new package
const addPackage = async (req, res) => {
    try {
        const newPackage = new Package(req.body);
        await newPackage.save();
        res.status(201).json(newPackage);
    } catch (error) {
        res.status(500).json({ message: 'Error adding package' });
    }
};

// Update a package
const updatePackage = async (req, res) => {
    try {
        const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.json(updatedPackage);
    } catch (error) {
        res.status(500).json({ message: 'Error updating package' });
    }
};

module.exports = { getPackages, addPackage, updatePackage };
