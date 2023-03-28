import React from "react";
import { Link } from "react-router-dom";

export default function Contact({theme}) {
    const color = theme === 'light' ? {color:'#333'} : {color:'#fff'};
    return (
        <div style={color}><p>Contact</p>
            <br/><Link to='https://www.linkedin.com/in/emilydaitch'>Linkedin</Link>
            <br/><button onClick={() => window.location = 'mailto:emily.daitch@gmail.com'}>Email Me</button>
        </div>
    )
}
