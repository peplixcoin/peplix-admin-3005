const express = require('express');
const { getPackages, addPackage, updatePackage } = require('../controllers/packageController');
const router = express.Router();

// Route to get all packages
router.get('/', getPackages);

// Route to add a new package
router.post('/', addPackage);

// Route to update a package
router.put('/:id', updatePackage);

module.exports = router;
