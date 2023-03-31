import React, { useState, useEffect } from 'react';
import { Paginator, Container, PageGroup, usePaginator } from 'chakra-paginator';
import PostList from './blogComponents/PostList';
import { Grid, Link } from '@chakra-ui/react';
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

export default function Main({theme}: Props) {
    const [postsTotal, setPostsTotal] = useState(undefined);
    const [posts, setPosts] = useState([]);

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

    useEffect(() => {        
        const fetchPosts = async (pageSize: string, offset: string) => {
            console.log('fetching with pageSize', pageSize, 'and offset', offset);
            const res = await fetch(
                `http://localhost/reactPhpBlogTemplate/api/posts?limit=${pageSize}&offset=${offset}`
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

    return (
        <>
            <p style={color}>This is a test site built following this <Link href='https://www.youtube.com/watch?v=RQYpSfXUgn4' color='teal.500'>YouTube tuorial</Link> by&ensp;
                <Link href='https://www.youtube.com/@ZarxBiz' color='teal.500'>Zarx Biz</Link>, using php and MySQL. It is hosted on an Apache server with Hostinger.</p>
            <p style={color}>For the moment, this is best viewed in Chrome and mobile is not supported, but is in the works!</p>
            <p style={color}>See my main portfolio site <Link href='https://emilydaitch.me' color='teal.500'>here</Link>.</p>
            <StyledPaginator
                pagesQuantity={pagesQuantity}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                activeStyles={activeStyles}
                normalStyles={normalStyles}>
                <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                    {posts.map(function({id, title, content, image}){
                        return <PostList key={id} id={id} title={title}
                            image={image} theme={theme}/>;
                    })}
                </Grid>
                <Container align="center" justify="space-between" w="full" p={4} marginTop={'50px'}>
                    <PageGroup isInline align="center"/>
                </Container>
            </StyledPaginator>
        </>
    );
}