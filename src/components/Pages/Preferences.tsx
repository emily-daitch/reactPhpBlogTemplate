import React from 'react';

type Props = {
    theme: string
}

export default function Preferences({theme}: Props) {
    const isLightTheme = theme === 'light';
    const styleColor = isLightTheme ? {color:'#333'} : {color:'#fff'};
    const color = isLightTheme ? '#333' : '#fff';    
    
    return(
        <h2>Preferences</h2>
    );
}