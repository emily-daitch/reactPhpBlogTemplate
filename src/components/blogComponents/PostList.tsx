import React from 'react';
import { Box } from '@chakra-ui/react'
import { Link } from "react-router-dom";

type PostListInput = {
    id: string,
    title: string,
    image: string,
    theme: string
}

export default function PostList({id, title, image, theme}: PostListInput) {
    console.log('theme from PostList', theme);
    function slug(str: string) {
        return str.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
    }

    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' m={15}>
            <Link to={slug(title)} state={id}>
                <img src={image} alt={title}/>
                <Box p={6}>
                    <Box 
                        mt='1'
                        fontWeight='semibold'
                        color={theme === 'light' ? '#333' : '#fff'}
                        as='h4'
                        >
                        {title}
                    </Box>
                </Box>
            </Link>
        </Box>
    )
}
