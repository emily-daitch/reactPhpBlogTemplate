import React, { useState, useEffect } from 'react';
import { SummaryActivity, DateDistance } from '../../types/strava';
import { getActivities, getMapActivity } from 'src/api/strava/getActivities';
import { Link } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { summaryActivity } from '../../data/summaryActivity';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

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
            label: date,
            distance: walkData.filter((datum: SummaryActivity) => {
                return datum.start_date === date ? true : false;
            }).reduce(
                (accumulator, currentValue) => accumulator + currentValue.distance,
                0),
            y: walkData.filter((datum: SummaryActivity) => {
                return datum.start_date === date ? true : false;
            }).reduce(
                (accumulator, currentValue) => accumulator + currentValue.distance,
                0)
        });
        runGraphData.push({
            start_date: date,
            label: date,
            distance: runData.filter((datum: SummaryActivity) => {
                return datum.start_date === date ? true : false;
            }).reduce(
                (accumulator, currentValue) => accumulator + currentValue.distance,
                0),
            y: runData.filter((datum: SummaryActivity) => {
                return datum.start_date === date ? true : false;
            }).reduce(
                (accumulator, currentValue) => accumulator + currentValue.distance,
                0)
        });
        bikeGraphData.push({
            start_date: date,
            label: date,
            distance: bikeData.filter((datum: SummaryActivity) => {
                return datum.start_date === date ? true : false;
            }).reduce(
                (accumulator, currentValue) => accumulator + currentValue.distance,
                0),
            y: bikeData.filter((datum: SummaryActivity) => {
                return datum.start_date === date ? true : false;
            }).reduce(
                (accumulator, currentValue) => accumulator + currentValue.distance,
                0.0),
        });
    }
    console.log('bikeGraphData', bikeGraphData);
    return [walkGraphData, runGraphData, bikeGraphData];
};

export default function Strava() {
    const google_maps_token = process.env.REACT_APP_GOOGLE_API_TOKEN;

    const [mapData, setMapData] = useState(summaryActivity as SummaryActivity);
    const [stravaData, setStravaData] = useState([summaryActivity as SummaryActivity]);
    const [stravaError, setStravaError] = useState(null);
    const [stravaLoading, setStravaLoading] = useState(true);
    async function getActivity() {
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
        getActivity();
    }, []);
    
    if (stravaError) {
        console.log('stravaError: ', stravaError);
        return <p>Failed to load Strava data</p>;
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
    
    //const imgurl=`https://maps.googleapis.com/maps/api/staticmap?size=600x300&maptype=roadmap&path=enc:${mapData?.map.summary_polyline}&key=${google_maps_token}`;
    const imgurl=`http://localhost/reactPhpBlogTemplate/api/getMapUrl?polyLine=${mapData?.map.summary_polyline}`;
    
    const options = {
        animationEnabled: true,
        exportEnabled: false,
        title: {
            text: 'Last Week of Activity',
            fontFamily: 'verdana'
        },
        axisY: {
            title: 'miles',
            includeZero: true,
            prefix: '',
            suffix: ' mi.'
        },
        toolTip: {
            shared: true,
            reversed: true,
            contentFormatter: function (e: any) {
                let content = ' ';
                for (let i = 0; i < e.entries.length; i++) {
                    content += e.entries[i].dataSeries.name + ': ' + '<strong>' + e.entries[i].dataPoint.y.toFixed(1) + ' mi.</strong>';
                    content += '<br/>';
                }
                return content;
            }
        },
        legend: {
            verticalAlign: 'center',
            horizontalAlign: 'right',
            reversed: true,
        },
        data: [
            {
                type: 'stackedColumn',
                name: 'Runs',
                showInLegend: true,
                yValueFormatString: '##.# mi.',
                dataPoints: runGraphData
            },
            {
                type: 'stackedColumn',
                name: 'Walks',
                showInLegend: true,
                yValueFormatString: '##.# mi.',
                dataPoints: walkGraphData
            },
            {
                type: 'stackedColumn',
                name: 'Bikes',
                showInLegend: true,
                yValueFormatString: '##.# mi.',
                dataPoints: bikeGraphData
            },
        ]
    };

    const monthlySumOptions = {
        animationEnabled: true,
        exportEnabled: false,
        title: {
            text: 'Monthly Summaries',
            fontFamily: 'verdana'
        },
        axisY: {
            title: 'miles',
            includeZero: true,
            prefix: '',
            suffix: ' mi.'
        },
        toolTip: {
            shared: true,
            reversed: true,
            contentFormatter: function (e: any) {
                let content = ' ';
                for (let i = 0; i < e.entries.length; i++) {
                    content += e.entries[i].dataSeries.name + ': ' + '<strong>' + e.entries[i].dataPoint.y.toFixed(1) + ' mi.</strong>';
                    content += '<br/>';
                }
                return content;
            }
        },
        legend: {
            verticalAlign: 'center',
            horizontalAlign: 'right',
            reversed: true,
        },
        data: [
            {
                type: 'stackedColumn',
                name: 'Runs',
                showInLegend: true,
                yValueFormatString: '##.# mi.',
                dataPoints: [
                    {
                        label: '03-2023',
                        y: 3.6
                    },
                    {
                        label: '04-2023',
                        y: 23.4
                    },
                    {
                        label: '05-2023',
                        y: 22.6
                    }
                ]
            },
            {
                type: 'stackedColumn',
                name: 'Walks',
                showInLegend: true,
                yValueFormatString: '##.# mi.',
                dataPoints: [
                    {
                        label: '03-2023',
                        y: 21.1
                    },
                    {
                        label: '04-2023',
                        y: 82.9
                    },
                    {
                        label: '05-2023',
                        y: 78.0
                    }
                ]
            },
            {
                type: 'stackedColumn',
                name: 'Bikes',
                showInLegend: true,
                yValueFormatString: '##.# mi.',
                dataPoints: [
                    {
                        label: '03-2023',
                        y: 0
                    },
                    {
                        label: '04-2023',
                        y: 21.8
                    },
                    {
                        label: '05-2023',
                        y: 11.7
                    }
                ]
            },
        ]
    };

    return stravaLoading ? <p>Loading...</p> : (
        <div><p>Strava API Powered Exercise Analytics</p>
            See the Strava API that provides this data <Link to='https://developers.strava.com/' style={{color: 'teal'}} target='_blank' rel='noopener noreferrer'>here</Link>.
            <br/><br/>
            Last Week of Activity:
            <Container maxW={'800px'}> 
                <CanvasJSChart options = {options}
                    //onRef={ref => this.chart = ref}
                />
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
            Monthly Summaries:
            <Container maxW={'800px'}> 
                <CanvasJSChart options = {monthlySumOptions}
                />
            </Container><br/>
            <p>Example Google Maps Static API Route Render:</p><br/>
            <div style={{justifyContent: 'center', display: 'flex'}}><img src={imgurl}></img></div>
        </div>
    );
}
