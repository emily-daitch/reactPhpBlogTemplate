import React, { useState } from 'react';
import { FormControl, Input, Button, useDisclosure } from '@chakra-ui/react';

type Props = {
    theme: string
}

export default function Register({theme}: Props) {
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
    console.log('certed ', certed);
    const protocol = certed === 'false' ? 'http' : 'https';
    const submitNewUser = async (email: string, password: string) => {
        const res = await fetch(
            `${protocol}://${env}${url}/api/submitNewUser?email=${email}&password=${password}`
        );

        return await res.json();
    };

    const onCloseClear = () => {
        onClose();
        setEmail('Email');
        setPassword('Password');
    };

    const onSubmit = async () => {
        // save user to DB
        await submitNewUser(email, password);
    };

    return(
        <>
            <h2>Register</h2>
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
    );
}