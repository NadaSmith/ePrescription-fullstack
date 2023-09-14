//redo this page. It is not right
import { v4 as uuidv4 } from "uuid";
import React from "react";


//function to get all prescriptions from local storage
export const getAllPrescriptions = () => {
    const prescriptions = JSON.parse(localStorage.getItem("prescription")) || [];
    return prescriptions
};

//function to add a new prescription
export const addPrescription = (newPrescription) => {
    const prescriptions = getAllPrescriptions();
    newPrescription.id = uuidv4();     //generates a unique ID for the new prescription added
    prescriptions.push(newPrescription);
    localStorage.setItem("prescriptions", JSON.stringify(prescriptions));
}

//function to update a prescription
export const updatePrescription = (updatedPrescription) => {
    const prescriptions = getAllPrescriptions();
    const index = prescriptions.findIndex((prescription) => prescription.id === updatedPrescription.id);
    if (index !== -1) {
        prescriptions[index] = updatedPrescription;
        localStorage.setItem("prescription", JSON.stringify(prescriptions));
    }
};


//function to delete a prescription
export const deletePrescription = (prescriptionId) => {
    const prescripitions = getAllPrescriptions();
    const updatedPrescriptions = prescripitions.filter((prescription) => prescription.id !== prescriptionId);
    localStorage.setItem("prescriptions", JSON.stringify(updatePrescription));
};



/*use localStorage.setItem to save prescription data and patient data to local storage,
use localStorage.getItem to retrieve prescription data and patient data to local storage,
function to get all prescriptions from local storage,
function to add new prescription in local storage,
function to update an existing prescription in local storage,
function to delete a prescription from local storage,
implementing IDs for prescriptions with npm install uuid*/

//To utilize data functions in my application, I will import the functions from prescriptions.js to interact with local storage data to components (prescription form, etc) 