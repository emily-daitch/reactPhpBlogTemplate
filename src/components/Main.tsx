import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import PostList from './blogComponents/PostList';

import { Paginator, Container, PageGroup, usePaginator } from 'chakra-paginator';
import { SimpleGrid, Link, Box, Stack } from '@chakra-ui/react';

type ChildrenProp = {
  children: React.ReactNode;
};

const StyledPaginator = styled(Paginator)<ChildrenProp>`
    pagesQuantity={pagesQuantity}
    currentPage={currentPage}
    onPageChange={setCurrentPage}
    activeStyles={activeStyles}
    normalStyles={normalStyles}
`;

type Props = {
    theme: string
}

type Post = {
    id: string,
    title: string,
    content: string,
    image: string
}

export default function Main({theme}: Props) {
    const [postsTotal, setPostsTotal] = useState(0);
    const [posts, setPosts] = useState([] as Post[]);

    console.log('theme from main', theme);

    const {
        pagesQuantity,
        offset,
        currentPage,
        setCurrentPage,
        pageSize,
    } = usePaginator({
        total: postsTotal,
        initialState: {
            pageSize: 8,
            isDisabled: false,
            currentPage: 1
        }
    });

    const normalStyles = {
        w:10,
        h:10,
        bg: '#333',
        color: '#fff',
        fontSize: 'lg',
        _hover: {
            bg: '#aaa',
            color: '#fff',
        }
    };

    const activeStyles = {
        w:10,
        h:10,
        bg: '#444',
        color: '#fff',
        fontSize: 'lg',
        _hover: {
            bg: '#aaa',
        }
    };

    const env = process.env.REACT_APP_STAGE;
    const url = process.env.REACT_APP_URL;
    const certed = process.env.REACT_APP_CERTED;
    const fakeDB = process.env.REACT_APP_FAKE_DB;
    const protocol = certed === 'false' ? 'http' : 'https';

    useEffect(() => {        
        const fetchPosts = async (pageSize: string, offset: string) => {
            if(fakeDB === 'true'){
                setPostsTotal(Number(pageSize));
                const fakePosts: Post[] = [];
                for(let i = 0; i < Number(pageSize); i++){
                    fakePosts.push({
                        id: i.toString(),
                        title: `title${i}`,
                        content: 'content',
                        image: 'https://ik.imagekit.io/emilydaitch/Test2.jpg?updatedAt=1680724497500' //replace with publicly available image (that I am not hosting)
                    });
                }
                setPosts(fakePosts);
                return;
            }
            console.log('fetching with pageSize', pageSize, 'and offset', offset);
            let res;
            try{
                res = await fetch(
                    `${protocol}://${env}${url}/api/posts?limit=${pageSize}&offset=${offset}`
                );
            } catch(err){
                res = null;
            }
            
            const data = res ? await res.json() : {count:0, posts:null};

            return data;
        };

        fetchPosts(pageSize.toString(), offset.toString()).then((fetchedPosts) => {
            setPostsTotal(fetchedPosts.count);
            setPosts(fetchedPosts.posts);
        });

    }, [pageSize, offset, env]);

    const color = theme === 'dark' ? {
        color: '#fff'
    } : {
        color: '#333'
    };
    const portfolioUrl = `https://${process.env.REACT_APP_PORTFOLIO_SITE}`;

    return (
        <Box>
            <p style={color}>This is a test site built following this <Link href='https://www.youtube.com/watch?v=RQYpSfXUgn4' color='teal.500'>
                YouTube tuorial</Link> by&ensp;
            <Link href='https://www.youtube.com/@ZarxBiz' color='teal.500'>Zarx Biz</Link>, using php and MySQL. 
                It is hosted on an Apache server with Hostinger.</p>
            <p style={color}>This site was built with React and the help of&nbsp;
                <Link href='https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwil6OHhisr-AhXTmWoFHYjxC44QFnoECAYQAQ&url=https%3A%2F%2Fchakra-ui.com%2F&usg=AOvVaw0i-kTFZCUJSLSin1koRPjM' color='teal.500'>Chakra UI</Link>.</p><br/>
            <p style={color}>You can find a guide to setting up your own project and hosting on the github&nbsp;
                <Link href='https://github.com/emily-daitch/reactPhpBlogTemplate#readme' color='teal.500'>README</Link>.</p>
            <p style={color}>The test posts you see exist so that enough content is here to demo the pagination on the home page.</p><br/>
            <p style={color}>So far this site has support for: 
                <div className='List'>
                    <ul>
                        <li>paginated blog posts</li>
                        <li>resume page</li>
                        <li>contact info page</li>
                        <li>calendar / scheduling page</li>
                    </ul>
                </div>
                <br/>
                For fun I&apos;ve added an optional Strava page that serves as an example for presenting data from an external API&nbsp;
                <Link href='https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjak4qPi8r-AhVYl2oFHRELCgYQFnoECA4QAQ&url=https%3A%2F%2Fdevelopers.strava.com%2Fdocs%2Freference%2F&usg=AOvVaw37v0Hj5zshRfj8faNnQ5Dm' color='teal.500'>(Strava)</Link> using&nbsp;
                <Link href='https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwj425Luisr-AhVolmoFHU26C84QFnoECBEQAQ&url=https%3A%2F%2Fformidable.com%2Fopen-source%2Fvictory%2Fdocs%2Fvictory-chart%2F&usg=AOvVaw1hYIMHOQahlQjkYpZMROzi' color='teal.500'>Victory charts</Link>.</p><br/>
            <p style={color}>See my main portfolio site <Link href={portfolioUrl} color='teal.500'>here</Link>.</p>
            <Stack>
                <StyledPaginator
                    pagesQuantity={pagesQuantity}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    activeStyles={activeStyles}
                    normalStyles={normalStyles}>
                    <SimpleGrid minChildWidth='300px' gap={6}>
                        {posts ? posts?.map(function({id, title, image}){
                            return <PostList key={id} id={id} title={title}
                                image={image} theme={theme}/>;
                        }) : <></>}
                    </SimpleGrid>
                    <Container align="center" justify="space-between" w="full" p={4} marginTop={'50px'}>
                        <PageGroup isInline align="center"/>
                    </Container>
                </StyledPaginator>
            </Stack>
        </Box>
    );
}
