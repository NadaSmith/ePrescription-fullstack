import React from "react";
import logo from "../images/logo.png";
import "./Header.css";

function Header() {
    return (
        <header className="global-header">
            <img src={logo} alt="Dose pill spot" />
            <div className="header">
                <h1 className="lightened">Dashbaord</h1>
                <h1 className="darkened">Patients</h1>
                <h1 className="darkened">Logout</h1>
            </div>
        </header>
    );
}

export default Header;