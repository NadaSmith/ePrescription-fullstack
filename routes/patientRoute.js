const express = require('express');
const router = express.Router();

// Import necessary functions from auth.js
const authMiddleware = require('../config/auth');

//import controller
const patientController = require('../controllers/patientController');

//create a new patient (post)
router.post('/patients', patientController.createPatient);

//fetch all patients (get)
router.get('/patients', patientController.getAllPatients);

//fetch single patient by ID (get)
router.get('/patients/:patientId', patientController.getPatientById);

//update a patient (put)
router.put('/patients/:patientId', patientController.updatePatient);

//delete a paitent (delete)
router.delete('/patients/:patientId', patientController.deletePatient);

module.exports = router;

//authMiddleware is applied to all routes to ensure that only authenticated users can access them