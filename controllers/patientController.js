const mongoose = require('mongoose');
const Patient = require('../models/Patient'); // Import your Patient model

//create a new patient
const createPatient = async (req, res) => {
    try {
      // Extract patient data from the request body
      const { name, age, gender, birthDate } = req.body;
  
      // Create a new patient using the Patient model
      const newPatient = new Patient({ name, age, gender, birthDate });
  
      // Save the new patient to the database
      await newPatient.save();
  
      res.status(201).json(newPatient);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
};

//fetch all patients
const getAllPatients = async (req, res) => {
    try {
      // Fetch all patients from the database using the Patient model
      const patients = await Patient.find();
  
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
};

//fetch single patient
const getPatientById = async (req, res) => {
    try {
      const patientId = req.params.patientId;
  
      // Fetch the patient by ID using the Patient model
      const patient = await Patient.findById(patientId);
  
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
};
  
//update a patient
const updatePatient = async (req, res) => {
    try {
      const patientId = req.params.patientId;
      const updatedPatientData = req.body;
  
      // Find and update the patient by ID using the Patient model
      const updatedPatient = await Patient.findByIdAndUpdate(
        patientId,
        updatedPatientData,
        { new: true } // Return the updated patient data
      );
  
      if (!updatedPatient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      res.status(200).json(updatedPatient);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
};

//delete a patient
const deletePatient = async (req, res) => {
    try {
      const patientId = req.params.patientId;
  
      // Find and remove the patient by ID using the Patient model
      const deletedPatient = await Patient.findByIdAndRemove(patientId);
  
      if (!deletedPatient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      res.status(200).json(deletedPatient);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
};
  


  
  
  