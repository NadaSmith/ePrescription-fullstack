const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  // Other user fields
});

module.exports = mongoose.model('Prescription', prescriptionSchema);


