const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');
const authMiddleware = require('../config/auth').authMiddleware; // Import your authentication middleware

//create new medication (post)
router.post('/medications', authMiddleware, medicationController.createMedication);

// fetch all medications (get)
router.get('/medications', authMiddleware, medicationController.getAllMedications);

// fetch single medication by id (get)
router.get('/medications/:medicationId', authMiddleware, medicationController.getMedicationById);

// update a medication (put)
router.put('/medications/:medicationId', authMiddleware, medicationController.updateMedication);

// delete a medicaton (delete)
router.delete('/medications/:medicationId', authMiddleware, medicationController.deleteMedication);

module.exports = router;
