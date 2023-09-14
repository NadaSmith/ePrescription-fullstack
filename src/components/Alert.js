import React from "react";
import exit from "../images/exit.png";
import "./Alert.css";

function Alert() {
    return(
        <div className="alert">
            <div className="alert-title">
                <h1>Alerts from "Pending" Medications</h1>
                <img src={exit}></img>
            </div>

            <div className="alert-box">
                <div className="small-alert-box">
                    <p>Minor Drug Interaction - Tylenol Cold & Flu Severe and Warfarin</p>
                </div>
            </div>
        </div>
    );
}


export default Alert;