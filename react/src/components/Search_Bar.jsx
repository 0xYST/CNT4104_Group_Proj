import React, { useState, useEffect } from 'react';
import "./styling_components/search_bar.css"

export default function SearchBar() {
    const search_prompt = () => {
        let songID;
        let usr_input = prompt("Enter the song ID.", "6sGiI7V9kgLNEhPIxEJDii")
        /* TO DO:
        /* - Implement search functionlity from search bar rather than prompt. 
        /* - Add in GET request from spotify API.
        /* - Figure out how to export/ intermingle search_bar module with song_info module to display info. 
        */
    }

    return (
        <div id="search-bar-container">
            <form id="song-search-form"> 
                <input id="search-bar" type="search"/>
                <button id="search-button" onClick={search_prompt()}> Click Me!</button>
            </form>
        </div>
    )
}
