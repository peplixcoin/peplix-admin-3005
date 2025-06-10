// controllers/usdRateController.js
const axios = require('axios');
const UsdRate = require('../models/UsdRate');

// Fetch and update USD rate from external API
exports.updateUsdRate = async (req, res) => {
  try {
    const response = await axios.get('https://v6.exchangerate-api.com/v6/aa64fbee472bf670561c5794/latest/USD');
    const usdToInr = response.data.conversion_rates.INR; // Get INR conversion rate

    // Update the rate in the database
    let usdRate = await UsdRate.findOne();
    if (!usdRate) {
      usdRate = new UsdRate({ rate: usdToInr });
    } else {
      usdRate.rate = usdToInr;
    }

    await usdRate.save();

    res.json({ message: 'USD rate updated', rate: usdToInr });
  } catch (error) {
    console.error('Error fetching USD rate', error);
    res.status(500).json({ error: 'Error fetching USD rate' });
  }
};

// Get the current USD rate from the database
exports.getUsdRate = async (req, res) => {
  try {
    const usdRate = await UsdRate.findOne();
    if (!usdRate) {
      return res.status(404).json({ message: 'USD rate not found' });
    }
    res.json(usdRate);
  } catch (error) {
    console.error('Error fetching USD rate', error);
    res.status(500).json({ error: 'Error fetching USD rate' });
  }
};
