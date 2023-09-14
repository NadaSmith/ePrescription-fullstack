import React from "react";
import "./AddPrescriptionOptions.css"

function AddPrescriptionOptions() {
    return (
        <div className="option-bar"> 
            <button className="clicked-button">Medication</button>
            <button>Supply</button>
            <button>Compound</button>
        </div>
    );
}


export default AddPrescriptionOptions;