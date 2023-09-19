import React from "react";
import  { useNavigate } from 'react-router-dom';
import "./HomePage.css";


function HomePage() {
    const navigate = useNavigate();

    function handleSignUp() {
        //navigate to the patientlistpage when the "Log In" button is clicked
        navigate("/registrationpage");
    }

    function handleLogin() {
        //navigate to the patientlistpage when the "Log In" button is clicked
        navigate("/loginpage");
    }

    return (
        <div className="login">

            <h1 className="homepage-title">N Dose</h1>

            <div className="login-btn">

                <button className="homepage-button" onClick={handleSignUp} >SIGN UP</button>
                

                <button className="homepage-button" onClick={handleLogin}>LOGIN</button>

            </div>

            
        </div>
    );
}

export default HomePage;

