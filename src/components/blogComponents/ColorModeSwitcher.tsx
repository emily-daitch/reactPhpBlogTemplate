import React from 'react';
import { Switch, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function ColorModeSwitcher() {
    const { colorMode, toggleColorMode } = useColorMode();
    const toggleSwitch = () => {
        console.log('colorMode', colorMode);
        toggleColorMode();
        console.log('colorMode post toggle', colorMode);
    };

    return (
        <Switch isChecked={colorMode === 'light'} onChange={toggleSwitch}>
            {colorMode === 'light' ? (<SunIcon mr="5"></SunIcon>) : (<MoonIcon mr="5"></MoonIcon>)}
        </Switch>
    );
}
