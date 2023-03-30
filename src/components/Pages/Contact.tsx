import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
    theme: string
}

export default function Contact({theme}: Props) {
    const color = theme === 'light' ? {color:'#333'} : {color:'#fff'};
    const win: Window = window;
    return (
        <div style={color}><p>Contact</p>
            <br/><Link to='https://www.linkedin.com/in/emilydaitch'>Linkedin</Link>
            <br/><button onClick={() => win.location = 'mailto:emily.daitch@gmail.com'}>Email Me</button>
        </div>
    );
}
