import React from 'react';
import { Box, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type PostListInput = {
    id: string,
    title: string,
    image: string,
}

export default function PostList({id, title, image}: PostListInput) {
    function slug(str: string) {
        return str.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }

    return (
        <Center>
            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' m={15}>
                <Link to={slug(title)} state={id}>
                    <img src={image} alt={title}/>
                    <Box p={6}>
                        <Box 
                            mt='1'
                            fontWeight='semibold'
                            as='h4'
                        >
                            {title}
                        </Box>
                    </Box>
                </Link>
            </Box>
        </Center>
    );
}
