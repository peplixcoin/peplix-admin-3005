const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  stacking_period: {
    type: Number,
    required: true
  },
  feature1: {
    type: String
  },
  feature2: {
    type: String
  },
  feature3: {
    type: String
  },
  feature4: {
    type: String
  },
 
  min_tokens_req: { type: Number, required: false }

}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema, 'packagedetails'); // Explicitly define the collection name 'packagedetails'
