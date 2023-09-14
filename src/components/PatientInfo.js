import React from "react";
import add from "../images/add.png"
import "./PatientInfo.css"


function PatientInfo({ patient }) {
    if (!patient) {
        return <div className="no-data">No patient data available.</div>;
    }
    
    return(
        <div className="patient-info">
            <div className="top">
            <h1>{patient.name}, {patient.gender}, {patient.age} </h1>
                <img src={add}></img>
            </div>

            <div className="bottom">
                <button className="drug">Add/Edit Drug Allergies</button>
                <button className="pharm">Add/Edit Pharmacies</button>
            </div>

        </div>
    ); 
}

export default PatientInfo;