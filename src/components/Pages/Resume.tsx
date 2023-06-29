import React from 'react';
import { Link } from 'react-router-dom';

export default function Resume() {
    return (
        <div><p>Resume</p>
            <br/><Link to='https://drive.google.com/file/d/1mBbvpMeTKAhM1y-A1mxXj2fRkFnqurlu/view?usp=sharing' target="_blank" rel="noopener noreferrer">
                <p style={{color: 'teal'}}>View/Download my Resume</p>
            </Link>
        </div>
    );
}
