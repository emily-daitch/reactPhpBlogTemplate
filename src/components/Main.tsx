import React, { useState, useEffect } from 'react';
import { Paginator, Container, PageGroup, usePaginator } from 'chakra-paginator';
import PostList from './blogComponents/PostList';
import { SimpleGrid, Link, Box, Stack } from '@chakra-ui/react';
import styled from 'styled-components';

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
    console.log('certed ', certed);
    const protocol = certed === 'false' ? 'http' : 'https';

    useEffect(() => {        
        const fetchPosts = async (pageSize: string, offset: string) => {
            console.log('fakeDB', fakeDB);
            if(fakeDB){
                setPostsTotal(Number(pageSize));
                const posts: Post[] = [];
                for(let i = 0; i < Number(pageSize); i++){
                    posts.push({
                        id: i.toString(),
                        title: `title${i}`,
                        content: 'content',
                        image: 'https://ik.imagekit.io/emilydaitch/Test2.jpg?updatedAt=1680724497500' //replace with publicly available image (that I am not hosting)
                    });
                }
                setPosts(posts);
                return;
            }
            console.log('fetching with pageSize', pageSize, 'and offset', offset);
            const res = await fetch(
                `${protocol}://${env}${url}/api/posts?limit=${pageSize}&offset=${offset}`
            );
            console.log('res', res);
            
            const data = await res.json();
            return data;
        };

        fetchPosts(pageSize.toString(), offset.toString()).then((posts) => {
            setPostsTotal(posts.count);
            setPosts(posts.posts);
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
            <p style={color}>This is a test site built following this <Link href='https://www.youtube.com/watch?v=RQYpSfXUgn4' color='teal.500'>YouTube tuorial</Link> by&ensp;
                <Link href='https://www.youtube.com/@ZarxBiz' color='teal.500'>Zarx Biz</Link>, using php and MySQL. It is hosted on an Apache server with Hostinger.</p>
            <p style={color}>For the moment, this is best viewed in Chrome and mobile is not supported, but is in the works!</p>
            <p style={color}>See my main portfolio site <Link href={portfolioUrl} color='teal.500'>here</Link>.</p>
            <Stack>
                <StyledPaginator
                    pagesQuantity={pagesQuantity}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    activeStyles={activeStyles}
                    normalStyles={normalStyles}>
                    <SimpleGrid minChildWidth='300px' gap={6}>
                        {posts.map(function({id, title, image}){
                            return <PostList key={id} id={id} title={title}
                                image={image} theme={theme}/>;
                        })}
                    </SimpleGrid>
                    <Container align="center" justify="space-between" w="full" p={4} marginTop={'50px'}>
                        <PageGroup isInline align="center"/>
                    </Container>
                </StyledPaginator>
            </Stack>
        </Box>
    );
}