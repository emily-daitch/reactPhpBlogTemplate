import React from 'react';
import { Box, Badge } from '@chakra-ui/react'
import { Link } from "react-router-dom";

export default function PostList({id, title, content, image}) {

    function slug(string) {
        return string.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
    }

    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' m={15}>
            <Link to={slug(title)} state={id}>
                <img src={image} alt={title}/>
                <Box p={6}>
                    <Box slug={title}
                        mt='1'
                        fontWeight='semibold'
                        as='h4'
                        lineWeight='tight'>
                        {title}
                    </Box>
                </Box>
            </Link>
        </Box>
    )
}