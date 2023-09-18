const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  diagnosis: {
    type: String,
    required: true,
  },
  drugName: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  directions: {
    type: String,
    required: true,
  },
  dispense: {
    type: Number,
    required: true,
  },
  dispenseUnit: {
    type: String,
    required: true,
  },
  refillNumber: {
    type: Number,
    required: true,
  },
  daysSupply: {
    type: Number,
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // Reference to the Patient model
    required: true,
  }
});

module.exports = mongoose.model('Medication', medicationSchema);
