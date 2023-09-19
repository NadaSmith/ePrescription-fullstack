import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegistrationPage.css";


function LoginPage() {

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    }

    async function handleLogin() {
        try {
            // Send a POST request to your backend's login endpoint
            const response = await axios.post("/login", credentials);
    
            // Log the request headers
            console.log("Request Headers:", response.config.headers);
    
            // Assuming your backend sends back a token upon successful login
            const token = response.data.token;
    
            // Store the token in a secure way (e.g., localStorage or cookies)
            localStorage.setItem("token", token);
    
            // Redirect to the patient list page
            window.location.href = "/patientlistpage"; // Use the appropriate URL
    
            // Redirect to the patient list page or perform any other action
        } catch (error) {
            console.error("Login failed:", error);
            // Handle login failure, show an error message, etc.
        }
    }
    
    const navigate = useNavigate();

    function handleLogin() {
        //navigate to the patientlistpage when the "Log In" button is clicked
        navigate("/loginpage");
    }

    return (
        <div className="registration">

            <h1>Registration Form</h1>

            <form autoComplete="off" className="registration-box">
                
                <div className="password"> 
                    <label>First Name</label>
                    <input 
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="password"> 
                    <label>Last Name</label>
                    <input 
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="password"> 
                    <label>Email</label>
                    <input 
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="username">
                    <label>Username</label>
                    <input 
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="password"> 
                    <label>Password</label>
                    <input 
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>

            </form>

            <div className="registration-button">
                
                <button className="first-button" onClick={handleLogin}>Register</button>
                
            
            </div>
        </div>
    );
}

export default LoginPage;

