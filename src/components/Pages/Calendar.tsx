import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
    theme: string
}

export default function Calendar({theme}: Props) {
    const isLightTheme = theme === 'light';
    const styleColor = isLightTheme ? {color:'#333'} : {color:'#fff'};
    const color = isLightTheme ? '#333' : '#fff';
    const calendar_link = process.env.REACT_APP_GOOGLE_CALENDAR_LINK;
    const calendly_link = process.env.REACT_APP_CALENDLY_SCHEDULE_LINK as string;
    console.log('calendly link', calendly_link);

    return (
        <div style={styleColor}><p>Calendar</p>
            <div style={{justifyContent: 'center', display: 'flex'}}>
                <iframe src={calendar_link} 
                    style={{border: 'solid 1px #777'}} 
                    width="800" 
                    height="600" 
                    frameBorder="0" 
                    scrolling="no"></iframe>
            </div>
            <br/>
            <p color={color}>Schedule a meeting with me <Link to={calendly_link} target="_blank" rel="noopener noreferrer" style={{color: 'teal'}}>here</Link>.</p>
        </div>
    );
}
