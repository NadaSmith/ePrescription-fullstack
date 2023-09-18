// controllers/medicationController.js
const Medication = require('../models/Medication'); // Import your Medication model

// Create a new medication record
exports.createMedication = async (req, res) => {
  try {
    // Extract medication data from the request body
    const { diagnosis, drugName, dosage, startDate, directions, dispense, dispenseUnit, refillNumber, daysSupply, patient } = req.body;

    // Create a new medication using the Medication model
    const newMedication = new Medication({ diagnosis, drugName, dosage, startDate, directions, dispense, dispenseUnit, refillNumber, daysSupply, patient });

    // Save the new medication to the database
    await newMedication.save();

    res.status(201).json(newMedication);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get medication details by ID
exports.getMedicationById = async (req, res) => {
  try {
    const medicationId = req.params.medicationId;

    // Fetch the medication by ID using the Medication model
    const medication = await Medication.findById(medicationId);

    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    res.status(200).json(medication);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update medication details
exports.updateMedication = async (req, res) => {
  try {
    const medicationId = req.params.medicationId;
    const updatedMedicationData = req.body;

    // Find and update the medication by ID using the Medication model
    const updatedMedication = await Medication.findByIdAndUpdate(
      medicationId,
      updatedMedicationData,
      { new: true } // Return the updated medication data
    );

    if (!updatedMedication) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    res.status(200).json(updatedMedication);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a medication by ID
exports.deleteMedication = async (req, res) => {
  try {
    const medicationId = req.params.medicationId;

    // Find and remove the medication by ID using the Medication model
    const deletedMedication = await Medication.findByIdAndRemove(medicationId);

    if (!deletedMedication) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    res.status(200).json(deletedMedication);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
