import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientListPage.css";
import NewPatientForm from "./NewPatientForm";



function PatientListPage() {
    const [patientData, setPatientData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);    
    const [isEditMode, setIsEditMode] = useState(false);    
    const [editingPatient, setEditingPatient] = useState(null);
    const [name, setName] = useState(""); // Declare the state setters here
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [filteredPatientData, setFilteredPatientData] = useState([]);
    const navigate = useNavigate();

    //function to show the form in add mode
    const showAddForm = () => {
        setIsFormVisible(true);
        setIsEditMode(false);
    };

    //function to show form in edit mode with selected pt
    const showEditForm = (patient) => {
        if (patient) {
            setIsFormVisible(true);
            setIsEditMode(true);

            // Set the form fields with the selected patient data
            setEditingPatient(patient);
        }
    };

    //function to hide the form
    const hideForm = () => {
        setIsFormVisible(false);

        //reset form fields
        setName('');
        setAge('');
        setGender('');
        setBirthDate('');
    };

    // Function to fetch patient data from local storage during component mount
    const fetchLocalPatientData = () => {
    const storedData = localStorage.getItem("patientData");
    if (storedData) {
      return JSON.parse(storedData);
    }
    return [];
    };

    // Function to fetch patient data from the JSON file
    const fetchPatientData = async () => {
    try {
      const response = await fetch("https://gist.githubusercontent.com/NadaSmith/377c51388ce91a7695592dc16f960509/raw/5f9039eedc6a6ed79abdf1554d92a8520d4bc769/PatientData.json");
      console.log("Fetch Response:", response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching patient data:", error);
      return [];
    }
};

    useEffect(() => {                                                               //useEffect hook runs when the component mounts; mounting includs reloading; causes table to populate 
        const fetchData = async () => {                                                 //have to change the alert function to a modal or alert component so the page won't reload; then the useEffect won't be mounted again so it will not autopopulate the data in the chart
            const dataFromJsonFile = await fetchPatientData();
            console.log("Fetched data:", dataFromJsonFile)
            if (dataFromJsonFile.length > 0) {
                setPatientData(dataFromJsonFile);
                localStorage.setItem("patientData", JSON.stringify(dataFromJsonFile));
            } else {
                const dataFromLocalStorage = fetchLocalPatientData();
                setPatientData(dataFromLocalStorage);
            }
        }

        fetchData();
    }, []);

    const handleSearch = async () => {
        //input value from search field
        if (!searchValue) {              
            //if empty search value, don't search
            return;
        }
        //Convert the search value and patient names to lowercase for case-insenstive comparison
        const lowercaseSearchValue = searchValue.toLowerCase();

        //checking to see if value has been lowercased
        console.log("Lowercase Search Value:", lowercaseSearchValue);

        //log the content of the patientData array
        console.log("Patient Data:", patientData);

        //fetch pt data (by name) from local patientData state
        const foundPatient = patientData.find(
            (patient) => patient.name.toLowerCase() === lowercaseSearchValue
        );
    
        //checking to see what info has been passed to foundPatient
        console.log("Found Patient:", foundPatient);

        if (foundPatient) {
            // Save the found patient in local storage
            localStorage.setItem("foundPatient", JSON.stringify(foundPatient));
            console.log("Fetched patient from Local Storage:", foundPatient);
        } else {
            // If patient is not found, show the alert and clear local storage
            alert("Patient not found."); //The alert function has default behavior triggers a page reload when alert is dismissed. alert function is synchronous and doesnt provide a way to control the browser: Make a model or alert component for this function
            localStorage.removeItem("foundPatient");
        }

        //Add a delay before the page reloads 
        setTimeout(() => {
            window.location.reload(); // Reload the page
        }, 3000); //3 seconds
    };
      

    //function to add a new patient from data
    const handleAddPatient = (newPatient) => {
        //assign a unique ID to the new pt object
        const uniqueID = Math.random();
        const newPatientWithID = { ...newPatient, id: uniqueID };

        //add the new pt w/ unique ID to the patientData array
        const updatedData = [...patientData, newPatientWithID];
        
        //save the updated patientData arry to local storage
        setPatientData(updatedData);
        localStorage.setItem("patientData", JSON.stringify(updatedData));
        
        setIsFormVisible(false);     //hide form after adding a new
    };

    //function to delete a patient from local storage
    const handleDeletePatient = (patientId) => {
        const updatedData = patientData.filter((patient) => patient.id !== patientId);
        setPatientData(updatedData);
        localStorage.setItem("patientData", JSON.stringify(updatedData));
    }

    // Function to handle editing a patient
    const handleEditPatient = (patientID, newData) => {
        const updatedData = patientData.map((patient) =>
            patient.id === patientID ? { ...patient, ...newData } : patient
        );
        setPatientData(updatedData);
        localStorage.setItem("patientData", JSON.stringify(updatedData));
        setIsFormVisible(false);
    };

    //function to handle clicking edit button
    const handleAddNewPatientClick = () => {
        setIsFormVisible(true);    //shows form when add new pt button is clicked
    }

    //function to set the pt to be edited
    const handleEditClick = (patient) => {
        setEditingPatient(patient);
        setIsFormVisible(true);    //shows form when edit button is clicked
    };

    function handleViewPatient(patientID) {
        // Redirect to the dashboard page, pass the pt ID as a URL parameter
        navigate(`/dashboardpage/${patientID}`);
    }
    
    return (
        <div className="patient-list">
            <h1>Patient List</h1>

            <div className="patient-list-form">

                <h2 className="find-a-patient">Find A Patient</h2>

                <form className="search-patient">
                    <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    <button onClick={handleSearch}>Search</button>
                    <p>Show Recent Patients</p>
                </form>

                <div className="recent-patient">
                    <h2>My Recent Patients</h2>
                    <button onClick={showAddForm}>Add New Patient</button>
                </div>
                

                {/*place table with 5rows (Name, Age, Gender, Birth Date, row for button)*/}
                <table className="patient-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Birth Date</th>
                            <th>
                                <></>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientData.map((patient) => (
                            <tr className="column-width" key={patient.id} patientData={patient}>
                                <td>{patient.name}</td>
                                <td>{patient.age}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.birthDate}</td>
                                <td>
                                    <button className="view" onClick={() => handleViewPatient(patient.id)}>View</button>
                                    <button className="edit" onClick={() => showEditForm(patient)}>Edit</button>
                                    <button className="delete" onClick={() => handleDeletePatient(patient.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {isFormVisible && (
                <NewPatientForm 
                    onAddPatient={handleAddPatient} 
                    onEditPatient={handleEditPatient} 
                    onCancel={hideForm} 
                    isEditMode={isEditMode} 
                    initialPatientData={editingPatient}
                    name={name}
                    setName={setName}
                    age={age}
                    setAge={setAge}
                    gender={gender}
                    setGender={setGender}
                    birthDate={birthDate}
                    setBirthDate={setBirthDate}
                />
                )}
            </div>
            
        </div>
    );
};

export default PatientListPage;


//When click on view button in chart will go to dashboardpage
//When press search button after inputting will got to dshboardpage




//This page is shown after logging in
//
//Add new patient feature will be built later