import React, { useState, useEffect } from 'react';
import { SummaryActivity, DateDistance } from '../../types/strava';
import { getActivities, getMapActivity } from 'src/api/strava/getActivities';
import { Link } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import moment from 'moment';
import { summaryActivity } from '../../data/summaryActivity';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

type Props = {
    theme: string
}

export const getAverageSpeed = (exerciseData: SummaryActivity[]) => {
    if (exerciseData.length == 0) return 0;
    const speedTotal = Number(exerciseData.reduce(
        (accumulator, currentValue) => accumulator + currentValue.average_speed,
        0));
    return speedTotal / exerciseData.length;
};

export const getDailyTotals = (dailyTotalData: SummaryActivity[][], dateArray: string[]): DateDistance[][] => {
    const walkData = dailyTotalData[0];
    const runData = dailyTotalData[1];
    const bikeData = dailyTotalData[2];
    const walkGraphData: DateDistance[] = [];
    const runGraphData: DateDistance[] = [];
    const bikeGraphData: DateDistance[] = [];
    for(const date of dateArray){
        walkGraphData.push({
            start_date: date,
            distance: walkData.filter((datum: SummaryActivity) => {
                return datum.start_date === date ? true : false;
            }).reduce(
                (accumulator, currentValue) => accumulator + currentValue.distance,
                0)
        });
        runGraphData.push({
            start_date: date,
            distance: runData.filter((datum: SummaryActivity) => {
                return datum.start_date === date ? true : false;
            }).reduce(
                (accumulator, currentValue) => accumulator + currentValue.distance,
                0)
        });
        bikeGraphData.push({
            start_date: date,
            distance: bikeData.filter((datum: SummaryActivity) => {
                return datum.start_date === date ? true : false;
            }).reduce(
                (accumulator, currentValue) => accumulator + currentValue.distance,
                0)
        });
    }

    return [walkGraphData, runGraphData, bikeGraphData];
};

export default function Strava({theme}: Props) {
    const isLightTheme = theme === 'light';
    const styleColor = isLightTheme ? {color:'#333', margin: 'auto'} : {color:'#fff', margin: 'auto'};
    const google_maps_token = process.env.REACT_APP_GOOGLE_API_TOKEN;

    const [mapData, setMapData] = useState(summaryActivity as SummaryActivity);
    const [stravaData, setStravaData] = useState([summaryActivity as SummaryActivity]);
    const [stravaError, setStravaError] = useState(null);
    const [stravaLoading, setStravaLoading] = useState(true);
    async function getA() {
        try {
            setStravaLoading(true);
            const stravaData = await getActivities();
            const mapData = await getMapActivity();
            setStravaData(stravaData);
            setMapData(mapData);
        } catch (e: any) {
            setStravaError(e);
        } finally {
            setStravaLoading(false);
        }
    }
    useEffect(() => {
        getA();
    }, []);
    
    if (stravaError) {
        console.log('stravaError: ', stravaError);
        return <p>Failed to load resource A</p>;
    }

    const dateArray = [
        // new Date(Date.now()).toISOString().slice(0,10),
        // new Date(Date.now() - (60*60*24*1000)).toISOString().slice(0,10),
        new Date(Date.now() - (60*60*24*1000*2)).toISOString().slice(0,10),
        new Date(Date.now() - (60*60*24*1000*3)).toISOString().slice(0,10),
        new Date(Date.now() - (60*60*24*1000*4)).toISOString().slice(0,10),
        new Date(Date.now() - (60*60*24*1000*5)).toISOString().slice(0,10),
        new Date(Date.now() - (60*60*24*1000*6)).toISOString().slice(0,10),
        new Date(Date.now() - (60*60*24*1000*7)).toISOString().slice(0,10),
        new Date(Date.now() - (60*60*24*1000*8)).toISOString().slice(0,10)
    ];
    
    const formattedDates = dateArray.map(date => moment(date, 'YYYY-MM-DD').toDate());

    const parsedStravaData = stravaData.filter((datum: SummaryActivity) => {
        datum.distance = datum.distance * 0.000621371;
        datum.average_speed = datum.average_speed * 2.23694;
        datum.start_date = datum.start_date.slice(0, 10);
        return dateArray.includes(datum.start_date) ? true : false;
    });

    const walkData = parsedStravaData.filter((datum: SummaryActivity) => {
        return datum.sport_type === 'Walk' ? true : false;
    });
    const runData = parsedStravaData.filter((datum: SummaryActivity) => {
        return datum.sport_type === 'Run' ? true : false;
    });
    const bikeData = parsedStravaData.filter((datum: SummaryActivity) => {
        return datum.sport_type === 'Ride' ? true : false;
    });

    const dailyTotalData = [walkData, runData, bikeData];

    const dd: DateDistance[][] = getDailyTotals(dailyTotalData, dateArray);
    const walkGraphData = dd[0];
    const runGraphData = dd[1];
    const bikeGraphData = dd[2];
    
    const padding = { top: 70, bottom: 100, left: 80, right: 40 };

    const imgurl=`https://maps.googleapis.com/maps/api/staticmap?size=600x300&maptype=roadmap&path=enc:${mapData?.map.summary_polyline}&key=${google_maps_token}`;
    return stravaLoading ? <p>Loading...</p> : (
        <div style={styleColor}><p>Strava API Powered Exercise Analytics</p>
            See the Strava API that provides this data <Link to="https://developers.strava.com/" style={{color: 'teal'}} target="_blank" rel="noopener noreferrer">here</Link>.
            <br/><br/>
            Last Week of Activity:
            <Container maxW={'800px'}> 
                {/* Add Canvas charts */}
            </Container><br/>
            <p style={{alignItems: 'center', justifyContent: 'center', alignContent: 'center', display: 'flex'}}>
                Totals for the past week:<br/>
                Total miles walked: {walkData.reduce(
                    (accumulator, currentValue) => accumulator + currentValue.distance,
                    0).toFixed(1)} mi.<br/>
                Total miles ran: {runData.reduce(
                    (accumulator, currentValue) => accumulator + currentValue.distance,
                    0).toFixed(1)} mi.<br/>
                Total miles biked: {bikeData.reduce(
                    (accumulator, currentValue) => accumulator + currentValue.distance,
                    0).toFixed(1)} mi.<br/><br/>
                Average speeds for the past week:<br/>
                Avg. walking speed: {getAverageSpeed(walkData).toFixed(1)} mi/h.<br/>
                Avg. running speed: {getAverageSpeed(runData).toFixed(1)} mi/h.<br/>
                Avg. biking speed: {getAverageSpeed(bikeData).toFixed(1)} mi/h.<br/><br/>
            </p><br/>
            <p>Example Google Maps Static API Route Render:</p><br/>
            <div style={{justifyContent: 'center', display: 'flex'}}><img src={imgurl}></img></div>
        </div>
    );
}
