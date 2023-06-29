import React from 'react';
import { Link } from 'react-router-dom';

export default function Calendar() {
    const calendar_link = process.env.REACT_APP_GOOGLE_CALENDAR_LINK;
    const calendly_link = process.env.REACT_APP_CALENDLY_SCHEDULE_LINK as string;

    return (
        <div><p>Calendar</p>
            <div style={{justifyContent: 'center', display: 'flex'}}>
                <iframe src={calendar_link} 
                    style={{border: 'solid 1px #777'}} 
                    width="800" 
                    height="600" 
                ></iframe>
            </div>
            <br/>
            <p>Schedule a meeting with me <Link to={calendly_link} target="_blank" rel="noopener noreferrer" style={{color: 'teal'}}>here</Link>.</p>
        </div>
    );
}
