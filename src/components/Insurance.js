import React from "react";
import add from "../images/add.png";
import insurance_pic from "../images/insurance_pic.png"
import "./Insurance.css";

function Insurance() {
    return(
        <div className="insurance-component">
            <div className="insurance">
                <h1>Coverage Details</h1>
                <img src={add}></img>
            </div>
            <div className="coverage-details">
                <img src={insurance_pic}></img>
            </div>

        </div>
    );
}


export default Insurance;