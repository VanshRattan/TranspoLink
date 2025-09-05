const mongoose = require('mongoose');

const GoodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  dimensions: {
    type: String,
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  deliveryLocation: {
    type: String,
    required: true,
  },
  pickupDate: {
    type: Date,
    required: true,
  },
  isUrgent: {
    type: Boolean,
    default: false,
  },
  truckType: {
    type: String,
  },
  specialRequirements: {
    type: String,
  },
  contactName: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  additionalNotes: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('good', GoodSchema);
