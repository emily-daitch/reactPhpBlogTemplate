import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Heading } from '@chakra-ui/react';
import parse from 'html-react-parser';

type Props = {
    theme: string
}

type PostData = {
    title: string,
    content: string,
    image: string
}

export default function SinglePost({theme}: Props) {

    const location = useLocation();
    const [postDataId, setPostData] = useState({});
    const [postData, setCurrentPost] = useState<PostData>({image: '', title: '', content: ''});
    const isLightTheme = theme === 'light';
    const styleColor = isLightTheme ? {color:'#333', background:'#fff'} : {color:'#fff', background:'#333'};
    const color = isLightTheme ? '#333' : '#fff';

    const env = process.env.REACT_APP_STAGE;
    const url = process.env.REACT_APP_URL;
    const certed = process.env.REACT_APP_CERTED;
    console.log('certed ', certed);
    const protocol = certed === 'false' ? 'http' : 'https';

    const fetchCurrentPost = async (id: string) => {
        const res = await fetch(
            `${protocol}://${env}${url}/api/getCurrentTopic?id=${id}`
        );

        return await res.json();
    };

    useState(()=> {
        setPostData(location.state);

        fetchCurrentPost(location.state).then((item)=> {
            setCurrentPost(item);
        });

        setTimeout(()=> {
            if(location.state == null){
                window.location.href='/404';
            }
        }, 10000);
    });

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
                        {parse(postData.content)}
                    </p>
                </Container>
            }
        </>
    );
}
