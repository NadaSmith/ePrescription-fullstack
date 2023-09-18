const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authMiddleware = require('../config/auth').authMiddleware; // Import your authentication middleware

//create a new patient (post)
router.post('/patients', authMiddleware, patientController.createPatient);

//fetch all patients (get)
router.get('/patients', authMiddleware, patientController.getAllPatients);

//fetch single patient by ID (get)
router.get('/patients/:patientId', authMiddleware, patientController.getPatientById);

//update a patiet (put)
router.put('/patients/:patientId', authMiddleware, patientController.updatePatient);

//delete a paitent (delete)
router.delete('/patients/:patientId', authMiddleware, patientController.deletePatient);

module.exports = router;

//authMiddleware is applied to all routes to ensure that only authenticated users can access them