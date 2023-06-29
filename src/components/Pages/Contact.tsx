import React from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
    const win: Window = window;
    return (
        <div><p>Contact</p>
            <br/><Link to='https://www.linkedin.com/in/emilydaitch' target="_blank" rel="noopener noreferrer" style={{color: 'teal'}}>Linkedin</Link>
            <br/><button onClick={() => win.location = 'mailto:emily.daitch@gmail.com'} style={{color: 'teal'}}>Email Me</button>
        </div>
    );
}
