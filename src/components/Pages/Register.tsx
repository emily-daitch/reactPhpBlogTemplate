import React, { useState } from 'react';
import { FormControl, Input } from '@chakra-ui/react';

type Props = {
    theme: string
}

export default function Register({theme}: Props) {
    const isLightTheme = theme === 'light';
    const styleColor = isLightTheme ? {color:'#333'} : {color:'#fff'};
    const color = isLightTheme ? '#333' : '#fff';
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const initialRef = React.useRef(null);

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
        </>
    );
}