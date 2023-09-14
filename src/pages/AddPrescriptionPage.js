import React, { useState } from "react";
import AddPrescriptionOptions from "../components/AddPrescriptionOptions";
import "./AddPrescriptionPage.css";
import exit from "../images/exit.png";
import PrescriptionForm from "../components/PrescriptionForm";
import { AppProvider } from "../components/AppContext";
import PendingMedication from "../components/PendingMedication";
import ReactModal from "react-modal";


const AddPrescriptionPage = () => {
    //sample state to hold patient's med info
    const [medicationName, setMedicationName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [prescriptionData, setPrescriptionData] = useState(null);
    const [fetchedData, setFetchedData] = useState(null);

    //function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        //create a new prescription object with form data
        const newPrescription = {
            medicationName,
            //add other prescription properties here
        };

        //get existing prescription data from local storage or iniatialize an empty array
        const existingPrescriptions = JSON.parse(localStorage.getItem("prescription")) || [];

        //add the new rescriptno to the existing prescription array
        const updatedPrescriptions = [...existingPrescriptions, newPrescription];

        //store the updated prescriptions in local stoarge
        localStorage.setItem("prescriptions", JSON.stringify(updatedPrescriptions));

        //clear the form fields after successful submission
        setMedicationName("");
        //open the modal after successful submission
        setIsModalOpen(true);

    }

    return (
        <div className="add-prescription-page">
            <div className="add-prescription-page-title">
                <h1 className="first-bar">Add Prescription</h1>
                <img src={exit}></img>
            </div>

            <div className="add-prescription-form">
                <AddPrescriptionOptions />

                <AppProvider>
                    <PrescriptionForm 
                        handleSubmit={handleSubmit} 
                        setIsModalOpen={setIsModalOpen}
                        fetchedData={fetchedData}
                    />
                </AppProvider>
            </div>
            
            {/* Render the PendingMedication component as a modal */}
            <ReactModal
                isOpen={isModalOpen} // Set isOpen prop to the isModalOpen state
                onRequestClose={() => setIsModalOpen(false)} // Handle modal close request
                contentLabel="Pending Medication"
            >
                <PendingMedication 
                    //passing fetchedData to pendingMedication component
                    fetchedData={fetchedData} 
                    closeModal={() => setIsModalOpen(false)} 
                />
            </ReactModal>

        </div>
    );
}

export default AddPrescriptionPage;