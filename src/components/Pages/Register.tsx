import React from 'react';

type Props = {
    theme: string
}

export default function Register({theme}: Props) {
    const isLightTheme = theme === 'light';
    const styleColor = isLightTheme ? {color:'#333'} : {color:'#fff'};
    const color = isLightTheme ? '#333' : '#fff';
    
    return(
        <h2>Register</h2>
    );
}