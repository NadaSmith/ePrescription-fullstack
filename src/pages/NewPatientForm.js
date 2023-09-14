import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./PatientListPage.css";

function NewPatientForm({ onAddPatient, initialPatientData, onEditPatient, onCancel, isEditMode }) {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
  
    // Effect to set the form fields with the selected patient data when in edit mode
    useEffect(() => {
      if (isEditMode && initialPatientData) {
        setName(initialPatientData.name);
        setAge(initialPatientData.age);
        setGender(initialPatientData.gender);
        setBirthDate(initialPatientData.birthDate);
      }
    }, [isEditMode, initialPatientData]);

    const handleAddPatient = () => {
      // Create a new patient object with form field values
      const newPatient = {
        id: Math.random(),
        name,
        age,
        gender,
        birthDate,
      };

      console.log("New patient data:", newPatient);

      // Call the onAddPatient function passed as a prop to add the new patient
      onAddPatient(newPatient);

      // Reset form fields
      onCancel();
    };

    const handleEditPatient = () => {
      // Create an updated patient object with form field values
      const updatedPatient = {
        ...initialPatientData,
        name,
        age,
        gender,
        birthDate,
      };

      console.log("Updated patient data:", updatedPatient);

      // Call the onEditPatient function passed as a prop to update the patient
      onEditPatient(initialPatientData.id, updatedPatient);

      // Hide the form
      onCancel();
    };

    const handleSubmit = () => {
      if (isEditMode) {
        handleEditPatient();
      } else {
        handleAddPatient();
      }
    };

    return (
        <Modal isOpen={true} onRequestClose={onCancel}>
          <div className="new">
              <h2 className="add-new-patient">{isEditMode ? "Edit Patient" : "Add New Patient"}</h2>
              <form className="new-patient-form">
                  
                  <div className="input-container"> 
                    <div className="name-input">
                      <label>
                          Name:
                        </label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="age-input">
                      <label>
                          Age:
                      </label>
                      <input type="text" value={age} onChange={(e) => setAge(e.target.value)} required />
                    </div>

                    <div className="gender-input">
                      <label>
                          Gender:
                      </label>
                      <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} required />
                    </div>

                    <div className="bday-input">
                      <label>
                          Birth Date:
                      </label>
                      <input type="text" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                    </div>

                  </div>

                  <div className="button-container">
                    <button className="new-patient-button" type="button" onClick={handleSubmit}>
                        {isEditMode ? "Save Changes" : "Add Patient"}
                    </button>
                    <button className="new-patient-button" onClick={onCancel}>Cancel</button>
                  </div>

              </form>
            </div>
        </Modal>
    );
}

export default NewPatientForm;