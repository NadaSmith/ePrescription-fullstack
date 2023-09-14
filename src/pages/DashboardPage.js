//Dashboard will contain most of the components here: footer, header, medication history, prescription form, inactive and active meds, and drug allergy
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import NameBanner from "../components/NameBanner";
import PatientInfo from "../components/PatientInfo";
import OfficeName from "../components/OfficeName";
import "./DashboardPage.css";
import Insurance from "../components/Insurance";
import AddPrescription from "../components/AddPrescription";
import AddPatientReported from "../components/AddPatientReported";
import DrugAllergy from "../components/DrugAllergy";
import Alert from "../components/Alert";

function DashboardPage()   {
    const { patientID } = useParams();         //get the patientID from the URL parameter
    const [patient, setPatient] = useState(null);     //state to store the found patient

    //fetch pt data from local storage using pt ID
    useEffect(() => {
        const storedData = localStorage.getItem("patientData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            const patient = parsedData.find((p) => p.id === parseFloat(patientID));
        } 
    }, [patientID]);    //add that here as a dependency to re-run effect when it changes


    return (
        <div className="dashboard-page">
            <Header />

            <NameBanner id="custom-banner"/>

            <OfficeName />

            <hr></hr>

            <div className="top-row">
                <PatientInfo />

                <Insurance />

                <div className="add-prescription-button-dashboard">
                    <AddPrescription className="first-button" />

                    <AddPatientReported />
                </div>
            </div>
        
            <div className="second-row">
                <DrugAllergy />

                <Alert />
            </div>

            <div className="add-medication">
              
            </div>

            {/*table of pending meds; in table add link to add prescription button*/}
            <div className="pending-medications">

            </div>
        </div>
    );
}

export default DashboardPage;

//these will be links