import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

import type { StyleFunctionProps } from '@chakra-ui/styled-system';

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
};

const theme = extendTheme({ 
    config,
    components: {
        Button: {
            // 1. We can update the base styles
            baseStyle: {
                fontWeight: 'bold', // Normally, it is "semibold"
            },
            // 2. We can add a new button size or extend existing
            sizes: {
                xl: {
                    h: '56px',
                    fontSize: 'lg',
                    px: '32px',
                },
            },
            // 3. We can add a new visual variant
            variants: {
                'with-shadow': {
                    bg: 'red.400',
                    boxShadow: '0 0 2px 2px #efdfde',
                },
                // 4. We can override existing variants
                solid: (props: StyleFunctionProps) => {
                    return ({
                        bg: props.colorMode === 'dark' ? 'black.300' : 'black.700',
                        color: props.colorMode === 'dark' ? 'black.700' : 'black.300',
                    });
                },
                // 5. We can add responsive variants
                sm: {
                    bg: 'teal.500',
                    fontSize: 'md',
                },
            },
            // 6. We can overwrite defaultProps
            defaultProps: {
                size: 'lg', // default is md
                variant: 'sm', // default is solid
                colorScheme: 'grey', // default is gray
            },
        },
    },
    styles: {
        global: (props: StyleFunctionProps) => {
            console.log('prooops', props);
            return ({
                '.opposite': {
                    div: {
                        fontFamily: 'body',
                        color: mode('whiteAlpha.900', 'gray.800')(props),
                        bg: mode('gray.800', 'gray.200')(props),
                        lineHeight: 'base',
                    },
                    a: {
                        color: mode('whiteAlpha.900', 'gray.800')(props),
                        bg: mode('gray.800', 'gray.200')(props),
                    },
                },
                div: {
                    fontFamily: 'body',
                    color: mode('gray.800', 'whiteAlpha.900')(props),
                    bg: mode('white', 'gray.800')(props),
                    lineHeight: 'base',
                },
                a: {
                    color: mode('gray.800', 'whiteAlpha.900')(props),
                    bg: mode('white', 'gray.800')(props),
                },
                p: {
                    fontFamily: 'body',
                    color: mode('gray.800', 'whiteAlpha.900')(props),
                    lineHeight: 'base',
                },
                li: {
                    fontFamily: 'body',
                    color: mode('gray.800', 'whiteAlpha.900')(props),
                    lineHeight: 'base',
                },
                header: {
                    color: mode('gray.800', 'whiteAlpha.900')(props),
                },
                footer: {
                    color: mode('gray.800', 'whiteAlpha.900')(props),
                },
                input: {
                    color: mode('gray.800', 'whiteAlpha.900')(props),
                },
            });
        },
    },
});

export default theme;

// export const lightTheme = {
//     body: "#fff",
//     color: '#333',
//     background: '#fff',
//     bg: '#fff',
//     text: "#000",
//     toggleBorder: "#FFF",
//     gradient: 'linear-gradient(#39598A, #79D7ED)',
// }

// export const darkTheme = {
//     body: "#363537",
//     color: '#fff',
//     background: '#333',
//     bg: '#333',
//     text: "#FAFAFA",
//     toggleBorder: "#6B8096",
//     gradient: 'linear-gradient(#091236, #1E21FD)',
// }