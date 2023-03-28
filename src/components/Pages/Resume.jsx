import React from "react";
import { Link } from "react-router-dom";

export default function Resume({theme}) {
    const isLightTheme = theme === 'light';
    const styleColor = isLightTheme ? {color:'#333'} : {color:'#fff'};
    const color = isLightTheme ? '#333' : '#fff';
    return (
        <div style={styleColor}><p>Resume</p>
            <br/><Link color={color} to='https://www.emilydaitch.click/DaitchResume2023.pdf'>
                <p color={color}>View/Download my Resume</p>
            </Link>
        </div>
    )
}
