const mongoose = require('mongoose');

const termsSchema = new mongoose.Schema({
    paragraph: {
        type: String,
        required: true
    }
});

const Terms = mongoose.model('Terms', termsSchema);

module.exports = Terms;
