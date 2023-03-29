import React from "react";
import { Link } from "react-router-dom";

export default function Resume({theme}) {
    const isLightTheme = theme === 'light';
    const styleColor = isLightTheme ? {color:'#333'} : {color:'#fff'};
    const color = isLightTheme ? '#333' : '#fff';
    const env = process.env.REACT_APP_STAGE;
    const resumeLink = `https://www.${env}.emilydaitch.click/DaitchResume2023.pdf`

    return (
        <div style={styleColor}><p>Resume</p>
            <br/><Link color={color} to={resumeLink}>
                <p color={color}>View/Download my Resume</p>
            </Link>
        </div>
    )
}
