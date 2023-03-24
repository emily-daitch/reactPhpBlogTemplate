import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Container, Heading } from '@chakra-ui/react'

export default function SinglePost() {

    const location = useLocation();
    const [postDataId, setPostData] = useState({});
    const [postData, setCurrentPost] = useState(null);

    const fetchCurrentPost = async (id) => {
    //     const res = await fetch(
    //         `http://localhost/reactPhp/api/getCurrentTopic?id=${id}`,
    //         {
    //             headers: {
    //                 "Access-Control-Allow-Origin": "*",
    //                 "Content-Type": "application/json"
    //             }
    //         }
    //     )

    //     return await res.json();
    return {
        image: 'test',
        title: 'testTitleSingle'
    };
    }

    useState(()=> {
        setPostData(location.state);

        fetchCurrentPost(location.state).then((item)=> {
            setCurrentPost(item);
        });

        setTimeout(()=> {
            if(location.state == null){
                window.location.href='/404';
            }
        }, 10000)
    },[location.state])

    return (
        <>
            {postData != null && <Container maxW='1200px' marginTop={'50px'}>
                <Heading
                    size='lg'
                    textAlign='center'
                    color='grey.700'
                >
                    {postData.title}
                </Heading>
                <img src={postData.image} width='300px' height='100px' alt='altTest'/>
                <br/>
                <hr/>
                <br/>
                <p>
                    {postData.content}
                </p>
                </Container>
            }
        </>
    )
}