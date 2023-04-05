import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
    theme: string
}

export default function Contact({theme}: Props) {
    const isLightTheme = theme === 'light';
    const styleColor = isLightTheme ? {color:'#333'} : {color:'#fff'};
    const color = isLightTheme ? '#333' : '#fff';
    const win: Window = window;
    return (
        <div style={styleColor}><p>Contact</p>
            <br/><Link to='https://www.linkedin.com/in/emilydaitch' target="_blank" rel="noopener noreferrer" style={{color: 'teal'}}>Linkedin</Link>
            <br/><button onClick={() => win.location = 'mailto:emily.daitch@gmail.com'} style={{color: 'teal'}}>Email Me</button>
        </div>
    );
}
