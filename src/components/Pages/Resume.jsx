import React from "react";
import { Link } from "react-router-dom";

export default function Resume({theme}) {
    const isLightTheme = theme === 'light';
    const styleColor = isLightTheme ? {color:'#333'} : {color:'#fff'};
    const color = isLightTheme ? '#333' : '#fff';

    return (
        <div style={styleColor}><p>Resume</p>
            <br/><Link color={color} to='https://drive.google.com/file/d/18yllIPAw3wG4IWpXaPUCXozxABqOD39k/view'>
                <p color={color}>View/Download my Resume</p>
            </Link>
        </div>
    )
}
