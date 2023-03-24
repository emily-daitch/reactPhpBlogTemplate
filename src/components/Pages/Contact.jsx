import React from "react";
import { Link } from "react-router-dom";

export default function Contact() {
    return (
        <div>Contact
        <br/><Link to='linkedin.com/in/emilydaitch'>Linkedin</Link>
        <br/><button onClick={() => window.location = 'mailto:emily.daitch@gmail.com'}>Email Me</button>
        </div>
    )
}