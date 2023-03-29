import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { Container, Heading } from '@chakra-ui/react'

export default function SinglePost({theme}) {

    const location = useLocation();
    const [postDataId, setPostData] = useState({});
    const [postData, setCurrentPost] = useState(null);
    const isLightTheme = theme === 'light';
    const styleColor = isLightTheme ? {color:'#333'} : {color:'#fff'};
    const color = isLightTheme ? '#333' : '#fff';

    const env = process.env.REACT_APP_STAGE;

    const fetchCurrentPost = async (id) => {
        const res = await fetch(
            `https://${env}emilydaitch.click/getCurrentTopic.php?id=${id}`
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
            {postData != null && 
                <Container maxW='1200px' marginTop={'50px'} style={styleColor}>
                    <Heading
                        size='lg'
                        textAlign='center'
                        color={color}
                    >
                        {postData.title}
                        <br/>
                        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                            <img src={postData.image} width='300px' height='100px' alt='altTest'/>
                        </div>
                    </Heading>
                    <br/>
                    <br/>
                    <p color={color}>
                        {postData.content}
                    </p>
                </Container>
            }
        </>
    )
}
