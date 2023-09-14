import React from "react";
import { useNavigate } from "react-router-dom";
import "./AddPrescription.css";


function AddPrescription() {

    const navigate = useNavigate();

    function handleAddingPrescription() {
        //navigate to the addprescriptionpage when the "Log In" button is clicked
        navigate("/addprescriptionpage");
    } 

    return(
        <button className="add-prescription-button" onClick={handleAddingPrescription}>
            Add Prescription
        </button>
    );
}

export default AddPrescription;

//When button click it links to AddPrescriptionPage