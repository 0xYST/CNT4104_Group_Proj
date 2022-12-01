import React, { useState, useEffect } from 'react';
import "./styling_components/header.css";

export default function Header() {

    return (
        <div className="header-text" id="header-container">
            <h1 className="header-text" id="website-title-text"> Spotify Track Search. </h1>
        </div>
    )
}