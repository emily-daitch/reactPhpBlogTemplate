import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

type Props = {
    theme: string
}

export default function Login({theme}: Props) {
    const isLightTheme = theme === 'light';
    const styleColor = isLightTheme ? {color:'#333'} : {color:'#fff'};
    const color = isLightTheme ? '#333' : '#fff';

    type User = {
        access_token: string;
    }
    type Profile = {
        picture: string;
        name: string;
        email: string;
    }

    const [ user, setUser ] = useState({} as User);
    const [ profile, setProfile ] = useState({} as Profile);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile({} as Profile);
    };

    return (
        <div style={styleColor}>
            <br/>
            <div>
                <h2>React Google Login</h2>
                <br />
                <br />
                {profile.name ? (
                    <div>
                        <div style={{justifyContent: 'center', display: 'flex'}}><img src={profile.picture} alt="user image" /></div>
                        <h3>User Logged in</h3>
                        <p>Name: {profile.name}</p>
                        <p>Email Address: {profile.email}</p>
                        <br />
                        <br />
                        <button onClick={logOut}>Log out</button>
                    </div>
                ) : (
                    <button onClick={() => login()}>Sign in with Google 🚀 </button>
                )}
            </div>
        </div>
    );
}
