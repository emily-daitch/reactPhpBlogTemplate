import React, { useState, useEffect } from 'react';
import { SummaryActivity } from '../../types/strava';
import { getActivities } from 'src/api/strava/getActivities';
import { Link } from 'react-router-dom';
import { Grid } from '@chakra-ui/react';
import { VictoryBar, VictoryLegend, VictoryStack, VictoryChart, VictoryAxis, VictoryTheme, VictoryContainer, VictoryLabel } from 'victory';

type Props = {
    theme: string
}

export default function Strava({theme}: Props) {
    const isLightTheme = theme === 'light';
    const styleColor = isLightTheme ? {color:'#333', margin: 'auto'} : {color:'#fff', margin: 'auto'};

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
        new Date(Date.now() - (60*60*24*1000)).toISOString().slice(0,10),
        new Date(Date.now() - (60*60*24*1000*2)).toISOString().slice(0,10),
        new Date(Date.now() - (60*60*24*1000*3)).toISOString().slice(0,10),
        new Date(Date.now() - (60*60*24*1000*4)).toISOString().slice(0,10),
        new Date(Date.now() - (60*60*24*1000*5)).toISOString().slice(0,10),
        new Date(Date.now() - (60*60*24*1000*6)).toISOString().slice(0,10),
        new Date(Date.now() - (60*60*24*1000*7)).toISOString().slice(0,10)
    ];

    const parsedStravaData = stravaData.filter((datum: SummaryActivity) => {
        datum.distance = datum.distance * 0.000621371;
        datum.average_speed = datum.average_speed * 2.23694;
        datum.start_date = datum.start_date.slice(0, 10);
        return dateArray.includes(datum.start_date) ? true : false;
    });

    const getAverageWalkingSpeed = () => {
        const speedTotal = Number(walkData.reduce(
            (accumulator, currentValue) => accumulator + currentValue.average_speed,
            0));
        return speedTotal / walkData.length;
    };

    const getAverageRunningSpeed = () => {
        const speedTotal = Number(runData.reduce(
            (accumulator, currentValue) => accumulator + currentValue.average_speed,
            0));
        return speedTotal / runData.length;
    };

    const runData = parsedStravaData.filter((datum: SummaryActivity) => {
        return datum.sport_type === 'Run' ? true : false;
    });
    const walkData = parsedStravaData.filter((datum: SummaryActivity) => {
        return datum.sport_type === 'Walk' ? true : false;
    });
    
    const padding = { top: 70, bottom: 100, left: 10, right: 10 };

    const exampleMapItem = parsedStravaData.find(x => x?.id === 8809747810);
    const imgurl=`https://maps.googleapis.com/maps/api/staticmap?size=600x300&maptype=roadmap&path=enc:${exampleMapItem?.map.summary_polyline}&key=AIzaSyCcaDzJ7Fgw7AztKYyawETL9ZntRbQ9zeE`;
    return stravaLoading ? <p>Loading...</p> : (
        <div style={styleColor}><p>Strava API Powered Exercise Analytics</p>
            See the Strava API that provides this data <Link to="https://developers.strava.com/" style={{color: 'blue'}}>here</Link>.
            <br/><br/>
            Last Week of Activity:
            <Grid templateColumns='repeat(2, 1fr)' gap={6} justifyContent={'center'} display={'flex'}>
                <VictoryChart height={600} 
                    width={600}
                    containerComponent={<VictoryContainer responsive={false} style={{margin: 'auto'}}/>}
                    padding={padding}
                    // domainPadding will add space to each side of VictoryBar to
                    // prevent it from overlapping the axis
                    theme={VictoryTheme.material}
                    domainPadding={20}
                >
                    <VictoryLegend x={0} y={0}
                        width={200}
                        title="Legend"
                        centerTitle
                        orientation="horizontal"
                        gutter={20}
                        style={{ border: { stroke: 'black' }, title: {fontSize: 20 } }}
                        data={[
                            { name: 'Runs', symbol: { fill: 'tomato' } },
                            { name: 'Walks', symbol: { fill: 'orange' } },
                            { name: 'Bikes', symbol: { fill: 'gold' }}
                        ]}
                    />
                    <VictoryAxis
                        // tickValues specifies both the number of ticks and where
                        // they are placed on the axis
                        tickValues={dateArray}
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
                    <VictoryStack
                        colorScale={['tomato', 'orange']}
                    >
                        <VictoryBar
                            data={runData}
                            // data accessor for x values
                            x="start_date"
                            // data accessor for y values
                            y="distance"
                        />
                        <VictoryBar
                            data={walkData}
                            // data accessor for x values
                            x="start_date"
                            // data accessor for y values
                            y="distance"
                        />
                    </VictoryStack>
                </VictoryChart>
                <p style={{alignItems: 'center', display: 'flex'}}>Totals for the past week:<br/>
                        Total miles walked: {walkData.reduce(
                        (accumulator, currentValue) => accumulator + currentValue.distance,
                        0).toFixed(1)} mi.<br/>
                        Total miles ran: {runData.reduce(
                        (accumulator, currentValue) => accumulator + currentValue.distance,
                        0).toFixed(1)} mi.<br/>
                        Total miles biked: 0 mi.<br/><br/>
                        Average speeds for the past week:<br/>
                        Avg. walking speed: {getAverageWalkingSpeed().toFixed(1)} mi/h.<br/>
                        Avg. running speed: {getAverageRunningSpeed().toFixed(1)} mi/h.<br/>
                        Avg. biking speed: 0 mi/h.<br/><br/>
                </p>
            </Grid>
            <p>Example Google Maps Static API Route Render:</p><br/>
            <div style={{justifyContent: 'center', display: 'flex'}}><img src={imgurl}></img></div>
        </div>
    );
}
