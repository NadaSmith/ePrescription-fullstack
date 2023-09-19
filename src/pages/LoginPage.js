import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.css";


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

    return (
        <div className="login">

            <h1>Log In</h1>

            <form autoComplete="off" className="login-box">

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

            <div className="checkbox"> 
                <button></button>
                <p>Remember me next time</p>
            </div>

            <div className="login-button">
                
                <button className="first-button" onClick={handleLogin}>Log In</button>
                
                <button className="second-button">Forgot Password</button>
            </div>
        </div>
    );
}

export default LoginPage;

