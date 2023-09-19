const express = require('express');
const router = express.Router();

// Import necessary functions from auth.js
const authMiddleware = require('../config/auth');

//import controller
const medicationController = require('../controllers/medicationController');

//create new medication (post)
router.post('/medications', medicationController.createMedication);

// fetch all medications (get)
router.get('/medications', medicationController.getAllMedications);

// fetch single medication by id (get)
router.get('/medications/:medicationId', medicationController.getMedicationById);

// update a medication (put)
router.put('/medications/:medicationId', medicationController.updateMedication);

// delete a medicaton (delete)
router.delete('/medications/:medicationId', medicationController.deleteMedication);

module.exports = router;
