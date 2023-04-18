import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { FormControl, Input, Button, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';

type Props = {
    theme: string
}

export default function Login({theme}: Props) {
    const isLightTheme = theme === 'light';
    const styleColor = isLightTheme ? {color:'#333'} : {color:'#fff'};
    const color = isLightTheme ? '#333' : '#fff';
    const textColor = isLightTheme ? '#fff' : '#333';
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const initialRef = React.useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const env = process.env.REACT_APP_STAGE;
    const url = process.env.REACT_APP_URL;
    const certed = process.env.REACT_APP_CERTED;
    const protocol = certed === 'false' ? 'http' : 'https';
    const checkUserCredentials = async (email: string, password: string) => {
        console.log('url is', `${protocol}://${env}${url}/api/checkUserCredentials?email=${email}&password=${password}`);
        const res = await fetch(
            `${protocol}://${env}${url}/api/checkUserCredentials?email=${email}&password=${password}`
        );

        return await res.json();
    };

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

    const onCloseClear = () => {
        onClose();
        setEmail('Email');
        setPassword('Password');
    };

    const onSubmit = async () => {
        // save user to DB
        const res = await checkUserCredentials(email, password);
        if(JSON.parse(res).verified){
            console.log('user verified');
        }
        else{
            console.log('failed to verify');
        }
    };

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
                    <>
                        <button onClick={() => login()}>Sign in with Google 🚀 </button>
                        <FormControl mt={4}>
                            <Input placeholder='Email'
                                ref={initialRef}
                                color={color}
                                onChange={(e)=> setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <Input placeholder='Password'
                                ref={initialRef}
                                color={color}
                                onChange={(e)=> setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button bg={color}
                            color={textColor} 
                            onClick={onSubmit}
                            marginRight={6}
                            marginTop={6}>
                                Submit
                        </Button>
                        <Button bg={color}
                            color={textColor} 
                            onClick={onCloseClear}
                            marginTop={6}>
                                Clear
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
