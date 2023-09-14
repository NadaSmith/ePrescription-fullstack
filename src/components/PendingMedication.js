import React, { useEffect, useState } from "react";
import { useAppContext } from "./AppContext";
import "./PendingMedication.css";
import Modal from "react-modal"
import { Link } from "react-router-dom";

function PendingMedication({}) {
    const [pendingMedicationData, setPendingMedicationData] = useState([]);
    const [selectedMedication, setSelectedMedication] = useState(null);
    const { isModalOpen, setIsModalOpen, setDrugInfo } = useAppContext();

    const handleViewMedication = (medication) => {
        //set druginfo in the context
        setDrugInfo(medication);
        //opens the modal
        setIsModalOpen(true);
    };

    useEffect(() => {
        const fetchMedicationData = async () => {
            
            //getting absolute path to json file
            const jsonPath = require.resolve("../data/Medication.json");
            //load med data from local JSON file
            try {
            const response = await fetch(jsonPath);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log(data);
            setPendingMedicationData(data.drugs);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchMedicationData();
    }, []);

    const handleAddMedication = () => {
        //create a new medication object withthe desired properties
        const newMedication = {
            id:Math.floor(Math.random() * 1000),
            name: "",
            dosage:"",
            instructions:"",
            side_effects:"",
            catgory:"",
        };

        //add new medication to the list
        const updatedPendingMedicationData = [...pendingMedicationData, newMedication];

        //update local state and local storage with updated list
        setPendingMedicationData(updatedPendingMedicationData);
        localStorage.setItem("pendingMedications", JSON.stringify(updatedPendingMedicationData));
    };

    
    const handleEditMedication = (medication => {
        setSelectedMedication(medication);
        setIsModalOpen(true);
    });

    const handleSaveMedication = () => {
        if (selectedMedication) {
            //find index of selected med in list
            const index = pendingMedicationData.findIndex(
                (medication) => medication.id === selectedMedication.id
            );

            //copy list to avoid modifying state
            const updatedPendingMedicationData = [...pendingMedicationData];

            //update selected med w/ new data
            updatedPendingMedicationData[index] = selectedMedication;

            //update local state and local storage w/ updated list
            setPendingMedicationData(updatedPendingMedicationData);
            localStorage.setItem("pendingMedications", JSON.stringify(updatedPendingMedicationData));

            //close modal
            setIsModalOpen(false);
        } 
    };

    const handleDeleteMedication = (medicationId) => {
        if (window.confirm("Are you sure you want to delete this medication!")) {
            const updatedPendingMedicationData = pendingMedicationData.filter(
                (medication) => medication.id !== medicationId
            );

            setPendingMedicationData(updatedPendingMedicationData);
            localStorage.setItem("pendingMedications", JSON.stringify(updatedPendingMedicationData));
        }
    }

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Pending Medication"
        >
            <div className="pending-medication">
                <p> Pending Medications</p>
            </div>
            

            <div className="select">
                
                <div className="select-all">
                    <button></button>
                    <p>Select All</p>
                </div>

                <div className="search-bar">
                    <label>Search:</label>
                    <input type="text"></input>
                </div>
            </div>

            <table className="pending-table">

                <tr>
                    <th>
                        <></>
                    </th>
                    <th>Medication</th>
                    <th>Dosage</th>
                    <th>Instructions</th>
                    <th>Side Effects</th>
                    <th>Category</th>
                    <th>
                        <></>
                    </th>

                    {/*Map through pending medicaiton data and display rows*/}
                </tr>

                <tbody>
                    {pendingMedicationData.map((medication) => (
                        <tr key={medication.id}>
                            <td className="select-all">
                                <button></button>
                            </td>
                            <td>{medication.name}</td>
                            <td>{medication.dosage}</td>
                            <td>{medication.instructions}</td>
                            <td>{medication.side_effects}</td>
                            <td>{medication.category}</td>
                            <td>
                                <select>
                                    <option>Actions</option>
                                    <option onClick={() => handleViewMedication(medication)}>Edit</option>
                                    <option onClick={() => handleDeleteMedication(medication.id)}>Delete</option>
                                </select>
                            </td>
                        </tr>  
                    ))}
               </tbody>
            </table>

            <div >
                <button>
                    <Link to="/dashboardpage/:patientID">Finish</Link>
                </button>
            </div>

            {selectedMedication && (
        <div>
          <h2>Medication Details</h2>
          <table className="medication-details-table">
            <tbody>
              <tr>
                <td>Medication Name:</td>
                <td>{selectedMedication.name}</td>
              </tr>
              <tr>
                <td>Dosage:</td>
                <td>{selectedMedication.dosage}</td>
              </tr>
              <tr>
                <td>Instructions:</td>
                <td>{selectedMedication.instructions}</td>
              </tr>
              <tr>
                <td>Side Effects:</td>
                <td>{selectedMedication.side_effects}</td>
              </tr>
              <tr>
                <td>Category:</td>
                <td>{selectedMedication.category}</td>
              </tr>
            </tbody>
          </table>
          {/* Other properties can be added as rows in this table */}
          <button onClick={handleSaveMedication}>Save</button>
          <button onClick={() => setIsModalOpen(false)}>Close Modal</button>
        </div>
      )}
        </Modal>
    );
};

export default PendingMedication;