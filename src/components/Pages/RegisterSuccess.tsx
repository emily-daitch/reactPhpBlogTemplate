import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

type Props = {
    theme: string
}

export default function Resume({theme}: Props) {
    const isLightTheme = theme === 'light';
    const styleColor = isLightTheme ? {color:'#333'} : {color:'#fff'};
    const color = isLightTheme ? '#333' : '#fff';
    const textColor = isLightTheme ? '#fff' : '#333';

    const navigate = useNavigate(); 
    const onGoToLogin = async () => {
        const path = '/login'; 
        navigate(path);
    };

    return (
        <>
            <div style={styleColor}><p>Registration Successful!</p>
            </div>
            <Button bg={color}
                color={textColor} 
                onClick={onGoToLogin}
                marginRight={6}
                marginTop={6}>
                    Go to Login
            </Button>
        </>
    );
}
