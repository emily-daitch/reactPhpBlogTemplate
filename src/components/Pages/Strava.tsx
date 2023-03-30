import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

type Props = {
    theme: string
}

export default function Strava({theme}: Props) {
    const isLightTheme = theme === 'light';
    const styleColor = isLightTheme ? {color:'#333'} : {color:'#fff'};
    const color = isLightTheme ? '#333' : '#fff';

    const [stravaData, setStravaData] = useState({});

    const auth_url = 'https://www.strava.com/oauth/token';
        
    const payload = {
        client_id: '104520',
        client_secret: 'c43faa53bae662f26d5fa4976683a56908a994c3',
        refresh_token: 'ced5a05bc1dc04c512818f940bb4270738bc4101',
        grant_type: 'refresh_token',
        f: 'json'
    };
    
    const getActivities = async (res: any) => {
        console.log('get activities');
        const activities_url = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`;
        const activities = await fetch(activities_url);
        return await activities.json();
    };

    const fetchToken = async () => {
        const res = await fetch(
            auth_url,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }
        );
        const id = await res.json();
        const data = await getActivities(id);
        return data;
    };   
    console.log('Requesting Token...\n');
    useState(()=> {
        fetchToken().then((data)=> {
            setStravaData(data);
        });
    });

    console.log('data', stravaData);
    const testData = [
        {quarter: 1, earnings: 13000},
        {quarter: 2, earnings: 16500},
        {quarter: 3, earnings: 14250},
        {quarter: 4, earnings: 19000}
    ];

    return (
        <div style={styleColor}><p>Strava API Powered Exercise Analytics</p>
            <br/>
            See the Strava API that provides this data <Link to="https://developers.strava.com/" style={{color: 'blue'}}>here</Link>.
            <VictoryChart
                // domainPadding will add space to each side of VictoryBar to
                // prevent it from overlapping the axis
                theme={VictoryTheme.material}
                domainPadding={20}
            >
                <VictoryAxis
                    // tickValues specifies both the number of ticks and where
                    // they are placed on the axis
                    tickValues={[1, 2, 3, 4]}
                    tickFormat={['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4']}
                />
                <VictoryAxis
                    dependentAxis
                    // tickFormat specifies how ticks should be displayed
                    tickFormat={(x) => (`$${x / 1000}k`)}
                />
                <VictoryBar
                    data={testData}
                    // data accessor for x values
                    x="quarter"
                    // data accessor for y values
                    y="earnings"
                />
            </VictoryChart>
        </div>
    );
}
