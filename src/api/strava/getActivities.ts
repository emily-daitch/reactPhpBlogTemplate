import { SummaryActivity } from '../../types/strava';

const client_secret = 'c43faa53bae662f26d5fa4976683a56908a994c3';//process.env.REACT_APP_STRAVA_CLIENT_SECRET;
const refresh_token = 'ced5a05bc1dc04c512818f940bb4270738bc4101';//process.env.REACT_APP_STRAVA_REFRESH_TOKEN;

const auth_url = 'https://www.strava.com/oauth/token';
        
const payload = {
    client_id: '104520',
    client_secret: client_secret,
    refresh_token: refresh_token,
    grant_type: 'refresh_token',
    f: 'json'
};

export const getActivities = async ():Promise<[SummaryActivity]> => {
    console.log('payload', payload);
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
    console.log('id: ', id);
    console.log('get activities');
    const before = {};
    const after = 1672531200;
    const page = {};
    const per_page = 50;
    
    const activities_url = `https://www.strava.com/api/v3/athlete/activities?access_token=${id.access_token}&after=${after}&per_page=${per_page}`;
    const activities = await fetch(activities_url);
    const data = await activities.json();
    console.log('data: ', data);
    return data;
}; 