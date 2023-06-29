import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Heading } from '@chakra-ui/react';
import parse from 'html-react-parser';

type PostData = {
    title: string,
    content: string,
    image: string
}

export default function SinglePost() {

    const location = useLocation();
    const [postDataId, setPostData] = useState({});
    const [postData, setCurrentPost] = useState<PostData>({image: '', title: '', content: ''});

    const env = process.env.REACT_APP_STAGE;
    const url = process.env.REACT_APP_URL;
    const certed = process.env.REACT_APP_CERTED;
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
                <Container maxW='1200px' marginTop={'50px'}>
                    <Heading
                        size='lg'
                        textAlign='center'
                    >
                        {postData.title}
                        <br/>
                        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                            <img src={postData.image} width='300px' height='100px' alt='altTest'/>
                        </div>
                    </Heading>
                    <br/>
                    <br/>
                    <p>
                        {parse(postData.content)}
                    </p>
                </Container>
            }
        </>
    );
}
