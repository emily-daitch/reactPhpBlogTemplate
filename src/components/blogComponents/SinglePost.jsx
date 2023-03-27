import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Container, Heading } from '@chakra-ui/react'

export default function SinglePost({theme}) {

    const location = useLocation();
    const [postDataId, setPostData] = useState({});
    const [postData, setCurrentPost] = useState(null);
    const color = theme === 'light' ? {color:'#333'} : {color:'#fff'};

    const fetchCurrentPost = async (id) => {
        const res = await fetch(
            `http://emilydaitch.click/getCurrentTopic.php?id=${id}`
        )

        return await res.json();
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
            {postData != null && <Container maxW='1200px' marginTop={'50px'} style={color}>
                <Heading
                    size='lg'
                    textAlign='center'
                    color={theme === 'light' ? '#333' : '#fff'}
                >
                    {postData.title}
                    <br/>
                    <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                        <img src={postData.image} width='300px' height='100px' alt='altTest'/>
                    </div>
                </Heading>
                <br/>
                <br/>
                <p color={theme === 'light' ? '#333' : '#fff'}>
                    {postData.content}
                </p>
                </Container>
            }
        </>
    )
}