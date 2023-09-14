//create form to add drug allergy
//Info: current drug allergies, edit, name, status, reaction type, reason, onset date, close, save, reset fields
import React from "react";
import "./DrugAllergy.css";
import exit from "../images/exit.png";

function DrugAllergy() {
    return(
        <div className="drug-allergy">
            <div className="drug-title">
                <h1>Drug/Allergy Interactions</h1>
                <img src={exit}></img>
            </div>
            <div className="drug-box">
                <p>This patient is allergic to acetaminophen.</p>
            </div>
        </div>
    );
}


export default DrugAllergy;