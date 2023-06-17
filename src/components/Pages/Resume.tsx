import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
    theme: string
}

export default function Resume({theme}: Props) {
    const isLightTheme = theme === 'light';
    const styleColor = isLightTheme ? {color:'#333'} : {color:'#fff'};
    const color = isLightTheme ? '#333' : '#fff';

    return (
        <div style={styleColor}><p>Resume</p>
            <br/><Link color={color} to='https://drive.google.com/file/d/1mBbvpMeTKAhM1y-A1mxXj2fRkFnqurlu/view?usp=sharing' target="_blank" rel="noopener noreferrer">
                <p style={{color: 'teal'}}>View/Download my Resume</p>
            </Link>
        </div>
    );
}
