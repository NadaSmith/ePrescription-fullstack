import React from "react";
import "./NameBanner.css";
import lock from "../images/lock.png"

function NameBanner() {
    return(
        <div className="name-banner">
            <div className="name-lock">
                <p>Welcome <emb>Dr. Ayronada Smith</emb></p>
                <img src={lock}></img>
            </div>
            <button>10 Provider Notifications</button>
        </div>
    );
}

export default NameBanner;