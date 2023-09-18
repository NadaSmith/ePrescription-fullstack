const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  age: { 
    type: Number, 
    required: true,
    min: 0,
  },
  gender: { 
    type: String, 
    required: true,
    enum: ['Male', 'Female', 'NonBinary']
  },
  birthdate: { 
    type: Date, 
    required: true 
  },
});

module.exports = mongoose.model('Patient', patientSchema);
