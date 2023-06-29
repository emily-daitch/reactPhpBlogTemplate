export type SummaryActivity = {
    name : string,
    distance : number,
    moving_time : number,
    elapsed_time : number,
    total_elevation_gain : number,
    type : string,
    sport_type : string,
    workout_type : string | null,
    id : number,
    external_id : string | null,
    upload_id : number,
    start_date : string,
    start_date_local : string,
    timezone : string,
    utc_offset : number,
    start_latlng : string | null,
    end_latlng : string | null,
    location_city : string | null,
    location_state : string | null,
    location_country : string,
    achievement_count : number,
    kudos_count : number,
    comment_count : number,
    athlete_count : number,
    photo_count : number,
    map : {
        id : string,
        summary_polyline : string | null,
        resource_state : number
    },
    trainer : boolean,
    commute : boolean,
    manual : boolean,
    private : boolean,
    flagged : boolean,
    gear_id : string,
    from_accepted_tag : boolean,
    average_speed : number,
    max_speed : number,
    average_cadence : number,
    average_watts : number,
    weighted_average_watts : number,
    kilojoules : number,
    device_watts : boolean,
    has_heartrate : boolean,
    average_heartrate : number,
    max_heartrate : number,
    max_watts : number,
    pr_count : 0,
    total_photo_count : number,
    has_kudoed : boolean,
    suffer_score : number
}

export type DateDistance = {
    start_date: string;
    distance: number;
    label?: string;
    y?: number;
}