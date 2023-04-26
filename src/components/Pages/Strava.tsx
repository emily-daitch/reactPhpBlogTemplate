import React, { useState, useEffect } from 'react';
import { SummaryActivity, DateDistance } from '../../types/strava';
import { getActivities } from 'src/api/strava/getActivities';
import { Link } from 'react-router-dom';
import { Grid, Container } from '@chakra-ui/react';
import { VictoryBar, VictoryLegend, VictoryStack, VictoryChart, VictoryAxis, VictoryTheme, VictoryContainer, VictoryLabel } from 'victory';
import moment from 'moment';

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
    const runData = dailyTotalData[0];
    const walkData = dailyTotalData[1];
    const bikeData = dailyTotalData[2];
    const runGraphData: DateDistance[] = [];
    const walkGraphData: DateDistance[] = [];
    const bikeGraphData: DateDistance[] = [];
    for(const date of dateArray){
        runGraphData.push({
            start_date: date,
            distance: runData.filter((datum: SummaryActivity) => {
                return datum.start_date === date ? true : false;
            }).reduce(
                (accumulator, currentValue) => accumulator + currentValue.distance,
                0)
        });
        walkGraphData.push({
            start_date: date,
            distance: walkData.filter((datum: SummaryActivity) => {
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

    const [stravaData, setStravaData] = useState([{
        'name' : 'Happy Friday',
        'distance' : 24931.4,
        'moving_time' : 4500,
        'elapsed_time' : 4500,
        'total_elevation_gain' : 0,
        'type' : 'Ride',
        'sport_type' : 'MountainBikeRide',
        'workout_type' : null,
        'id' : 154504250376823,
        'external_id' : 'garmin_push_12345678987654321',
        'upload_id' : 9876543,
        'start_date' : '2018-05-02T12:15:09Z',
        'start_date_local' : '2018-05-02T05:15:09Z',
        'timezone' : '(GMT-08:00) America/Los_Angeles',
        'utc_offset' : -25200,
        'start_latlng' : null,
        'end_latlng' : null,
        'location_city' : null,
        'location_state' : null,
        'location_country' : 'United States',
        'achievement_count' : 0,
        'kudos_count' : 3,
        'comment_count' : 1,
        'athlete_count' : 1,
        'photo_count' : 0,
        'map' : {
            'id' : 'a12345678987654321',
            'summary_polyline' : null,
            'resource_state' : 2
        },
        'trainer' : true,
        'commute' : false,
        'manual' : false,
        'private' : false,
        'flagged' : false,
        'gear_id' : 'b12345678987654321',
        'from_accepted_tag' : false,
        'average_speed' : 5.54,
        'max_speed' : 11,
        'average_cadence' : 67.1,
        'average_watts' : 175.3,
        'weighted_average_watts' : 210,
        'kilojoules' : 788.7,
        'device_watts' : true,
        'has_heartrate' : true,
        'average_heartrate' : 140.3,
        'max_heartrate' : 178,
        'max_watts' : 406,
        'pr_count' : 0,
        'total_photo_count' : 1,
        'has_kudoed' : false,
        'suffer_score' : 82
    } as SummaryActivity]);
    const [stravaError, setStravaError] = useState(null);
    const [stravaLoading, setStravaLoading] = useState(true);
    async function getA() {
        try {
            setStravaLoading(true);
            const stravaData = await getActivities();
            setStravaData(stravaData);
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
        new Date(Date.now()).toISOString().slice(0,10),
        new Date(Date.now() - (60*60*24*1000)).toISOString().slice(0,10),
        new Date(Date.now() - (60*60*24*1000*2)).toISOString().slice(0,10),
        new Date(Date.now() - (60*60*24*1000*3)).toISOString().slice(0,10),
        new Date(Date.now() - (60*60*24*1000*4)).toISOString().slice(0,10),
        new Date(Date.now() - (60*60*24*1000*5)).toISOString().slice(0,10),
        new Date(Date.now() - (60*60*24*1000*6)).toISOString().slice(0,10)
    ];
    
    const formattedDates = dateArray.map(date => moment(date, 'YYYY-MM-DD').toDate());
    console.log('formatted dated', formattedDates);

    const parsedStravaData = stravaData.filter((datum: SummaryActivity) => {
        datum.distance = datum.distance * 0.000621371;
        datum.average_speed = datum.average_speed * 2.23694;
        datum.start_date = datum.start_date.slice(0, 10);
        return dateArray.includes(datum.start_date) ? true : false;
    });

    const runData = parsedStravaData.filter((datum: SummaryActivity) => {
        return datum.sport_type === 'Run' ? true : false;
    });
    const walkData = parsedStravaData.filter((datum: SummaryActivity) => {
        return datum.sport_type === 'Walk' ? true : false;
    });
    const bikeData = parsedStravaData.filter((datum: SummaryActivity) => {
        return datum.sport_type === 'Ride' ? true : false;
    });

    const dailyTotalData = [walkData, runData, bikeData];

    const dd: DateDistance[][] = getDailyTotals(dailyTotalData, dateArray);
    const walkGraphData = dd[0];
    const runGraphData = dd[1];
    const bikeGraphData = dd[2];

    console.log('parsedStravaData', stravaData);
    
    const padding = { top: 70, bottom: 100, left: 80, right: 40 };

    const exampleMapItem = stravaData.find(x => x?.id === 8809747810);
    console.log('exampleMapItem', exampleMapItem);
    const imgurl=`https://maps.googleapis.com/maps/api/staticmap?size=600x300&maptype=roadmap&path=enc:${exampleMapItem?.map.summary_polyline}&key=${google_maps_token}`;
    return stravaLoading ? <p>Loading...</p> : (
        <div style={styleColor}><p>Strava API Powered Exercise Analytics</p>
            See the Strava API that provides this data <Link to="https://developers.strava.com/" style={{color: 'teal'}} target="_blank" rel="noopener noreferrer">here</Link>.
            <br/><br/>
            Last Week of Activity:
            <Container maxW={'800px'}><VictoryChart
                containerComponent={<VictoryContainer responsive={true} style={{margin: 'auto'}}/>}
                padding={padding}
                // domainPadding will add space to each side of VictoryBar to
                // prevent it from overlapping the axis
                theme={VictoryTheme.material}
                domainPadding={20}
            >
                <VictoryLegend
                    x={80}
                    title="Legend"
                    centerTitle
                    orientation="horizontal"
                    gutter={20}
                    style={{ border: { stroke: 'black' }, title: {fontSize: 10 } }}
                    data={[
                        { name: 'Runs', symbol: { fill: 'tomato' } },
                        { name: 'Walks', symbol: { fill: 'orange' } },
                        { name: 'Bikes', symbol: { fill: 'gold' }}
                    ]}
                />
                <VictoryStack
                    colorScale={['gold', 'orange', 'tomato']}
                >
                    <VictoryBar
                        data={bikeGraphData}
                        // data accessor for x values
                        x="start_date"
                        // data accessor for y values
                        y="distance"
                    />
                    <VictoryBar
                        data={walkGraphData}
                        // data accessor for x values
                        x="start_date"
                        // data accessor for y values
                        y="distance"
                    />
                    <VictoryBar
                        data={runGraphData}
                        // data accessor for x values
                        x="start_date"
                        // data accessor for y values
                        y="distance"
                    />
                </VictoryStack>
                <VictoryAxis
                    // tickValues specifies both the number of ticks and where
                    // they are placed on the axis
                    scale='time'
                    tickValues={formattedDates}
                    // tickFormat={(x) => (`${()}`)}
                    fixLabelOverlap
                    axisLabelComponent={<VictoryLabel dy={25} />}
                    label={'Last seven days of activity'}
                />
                <VictoryAxis
                    dependentAxis
                    // tickFormat specifies how ticks should be displayed
                    tickFormat={(x) => (`${(x).toFixed(1)} mi`)}
                />
            </VictoryChart></Container><br/>
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
