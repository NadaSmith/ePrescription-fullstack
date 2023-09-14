const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  // Other user fields
});

module.exports = mongoose.model('Patient', patientSchema);
