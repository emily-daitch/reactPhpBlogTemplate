import React, { useState, useEffect, useRef } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { FormControl, Input, Button, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';

type Props = {
    theme: string
}

type User = {
    access_token: string;
}
type Profile = {
    picture: string;
    name: string;
    email: string;
}

export default function Register({theme}: Props) {
    const isLightTheme = theme === 'light';
    const styleColor = isLightTheme ? {color:'#333'} : {color:'#fff'};
    const color = isLightTheme ? '#333' : '#fff';
    const textColor = isLightTheme ? '#fff' : '#333';
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [ user, setUser ] = useState({} as User);
    const [ profile, setProfile ] = useState({} as Profile);
    const [error, setError] = useState(false);
    const [showErrorText, setShowErrorText] = useState(false);
    const ref = useRef<HTMLInputElement>(null);

    const initialRef = React.useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const env = process.env.REACT_APP_STAGE;
    const url = process.env.REACT_APP_URL;
    const certed = process.env.REACT_APP_CERTED;
    const protocol = certed === 'false' ? 'http' : 'https';
    const submitNewUser = async (email: string, password: string) => {

        const res = await fetch(
            `${protocol}://${env}${url}/api/submitNewUser?email=${email}&password=${password}`
        );

        return await res.json();
    };

    const checkUserByEmail = async (email: string) => {

        const res = await fetch(
            `${protocol}://${env}${url}/api/checkForUserByEmail?email=${email}`
        );

        return await res.json();
    };

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile({} as Profile);
    };

    const onCloseClear = () => {
        onClose();
        setEmail('Email');
        setPassword('Password');
    };

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    const onSubmit = async () => {
        // save user to DB
        await submitNewUser(email, password);
    };
    const onEmailFinal = async (): Promise<boolean> => {
        const res = JSON.parse(await checkUserByEmail(email));
        console.log('onEmailFinal: ', res);
        console.log('onEmailFinal: ', res.response);
        return res.response === 'existing';
    };

    useEffect(
        () => {
            if (user && profile.name) {
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
                    .catch((err: Error) => console.log(err));
            }
        },
        [ user ]
    );

    function style(error: boolean) {
        if (error) {
            return { backgroundColor: 'rgba(255, 0, 0, 0.5)' };
        }
    }
    
    const handleBlur = async () => {
        async function anyNameFunction(): Promise<boolean> {
            const res = await onEmailFinal();
            return res;
        }

        const res: boolean = await anyNameFunction();
        console.log('handleBlur res', res);
        if (!error) {
            if (res && ref.current) {
                ref.current.focus();
                setError(true);
                setShowErrorText(true);
            }
        }
        if (error) {
            setShowErrorText(false);
        }
    };
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(false);
            setShowErrorText(false);
        }
        setEmail(event.target?.value);
    };
    
    const handleFocus = () => {
        if (error) {
            setShowErrorText(true);
        }
    };

    return(
        <>
            <h2>Register</h2>
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
                                    ref={ref}
                                    color={color}
                                    style={style(error)}
                                    onBlur={async() => handleBlur()}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                />
                            </FormControl>
                            {showErrorText && (
                                <p role="alert" style={{ color: 'rgb(255, 0, 0)' }}>
                                This email already exists as a user. Did you forget your password? Reset it here. Otherwise, you may have used google to authenticate in the past and can use this to sign in (above).
                                </p>
                            )}
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
        </>
    );
}