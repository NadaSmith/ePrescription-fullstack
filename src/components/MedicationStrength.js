import react, { useState, useHistory } from "react";

const MedicationStrength = ({ medicationData }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const history = useHistory();     

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        //navigate to selected option when changed
        if (event.target.value) {
            history.push(`/medication/${event.target.value}`);
        }
    };


    return (
        <div className="medication-strength">
            <label htmlFor="dropdown">Click on the desired strength for this medication:</label>
            <select id="dropdown" value={selectedOption} onChange={handleChange}>
                <option value="">Choose strength</option>
                {medicationData.map((medication, index) => (
                    <option key={index} value={medication.strength}>
                        {medication.strength}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default MedicationStrength;







