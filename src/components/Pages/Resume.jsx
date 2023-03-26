import React from "react";
import { Link } from "react-router-dom";

export default function Resume({theme}) {
    const color = theme === 'light' ? {color:'#333'} : {color:'#fff'};
    return (
        <div style={color}><p>Resume</p>
        <br/><Link color={theme === 'light' ? '#333' : '#fff'} to='https://www.emilydaitch.click/DaitchResume2023.pdf'>
            <p color={theme === 'light' ? '#333' : '#fff'}>View/Download my Resume</p>
            </Link>
        </div>
    )
}