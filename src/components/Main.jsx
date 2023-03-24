import React, { useState, useEffect } from "react";
import { Paginator, Container, PageGroup, usePaginator } from "chakra-paginator";
import PostList from "./blogComponents/PostList";
import { Grid } from '@chakra-ui/react';

export default function Main() {

    const [postsTotal, setPostsTotal] = useState(undefined);
    const [posts, setPosts] = useState([]);

    const {
        pagesQuantity,
        offset,
        currentPage,
        setCurrentPage,
        pageSize,
    } = usePaginator({
        total: postsTotal,
        initialState: {
            pageSize: 10,
            isDisabled: false,
            currentPage: 1
        }
    })

    const normalStyles = {
        w:10,
        h:10,
        bg: "#333",
        color: '#fff',
        fontSize: 'lg',
        _hover: {
            bg: 'red',
            color: '#fff',
        }
    }

    const activeStyles = {
        w:10,
        h:10,
        bg: "green",
        color: '#fff',
        fontSize: 'lg',
        _hover: {
            bg: 'blue',
        }
    }

    const fetchPosts = async (pageSize, offset) => {
        const res = await fetch(
            `http://localhost/reactPhp/api/posts?limit=${pageSize}&offset=${offset}`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            }
        );
        console.log('offset', offset);
        // const res = offset === 0 ? {
        //     //body: {
        //         posts: [
        //             {
        //                 id: "1",
        //                 user_id: "1",
        //                 title: "title1",
        //                 content: "this is good content",
        //                 image: "https:\/\/via.placeholder.com\/600\/771796"
        //             },
        //             {
        //                 id: "2",
        //                 user_id: "1",
        //                 title: "title2",
        //                 content: "this is good content",
        //                 image: "https:\/\/via.placeholder.com\/600\/771796"
        //             },
        //             {
        //                 id: "3",
        //                 user_id: "1",
        //                 title: "title3",
        //                 content: "this is good content",
        //                 image: "https:\/\/via.placeholder.com\/600\/771796"
        //             },
        //             {
        //                 id: "4",
        //                 user_id: "2",
        //                 title: "title4",
        //                 content: "this is good content",
        //                 image: "https:\/\/via.placeholder.com\/600\/771796"
        //             },
        //             {
        //                 id: "5",
        //                 user_id: "2",
        //                 title: "title5",
        //                 content: "this is good content",
        //                 image: "https:\/\/via.placeholder.com\/600\/771796"
        //             },
        //             {
        //                 id: "6",
        //                 user_id: "3",
        //                 title: "title6",
        //                 content: "this is good content",
        //                 image: "https:\/\/via.placeholder.com\/600\/771796"
        //             },
        //             {
        //                 id: "7",
        //                 user_id: "1",
        //                 title: "title7",
        //                 content: "this is good content",
        //                 image: "https:\/\/via.placeholder.com\/600\/771796"
        //             },
        //             {
        //                 id: "8",
        //                 user_id: "1",
        //                 title: "title8",
        //                 content: "this is good content",
        //                 image: "https:\/\/via.placeholder.com\/600\/771796"
        //             },
        //             {
        //                 id: "9",
        //                 user_id: "1",
        //                 title: "title9",
        //                 content: "this is good content",
        //                 image: "https:\/\/via.placeholder.com\/600\/771796"
        //             },
        //             {
        //                 id: "10",
        //                 user_id: "1",
        //                 title: "title10",
        //                 content: "this is good content",
        //                 image: "https:\/\/via.placeholder.com\/600\/771796"
        //             },
        //             {
        //                 id: "11",
        //                 user_id: "1",
        //                 title: "title11",
        //                 content: "this is good content",
        //                 image: "https:\/\/via.placeholder.com\/600\/771796"
        //             },
        //             {
        //                 id: "12",
        //                 user_id: "1",
        //                 title: "title12",
        //                 content: "this is good content",
        //                 image: "https:\/\/via.placeholder.com\/600\/771796"
        //             }
        //         ],
        //         count: 12
        //     //}
        // } : {
        //     posts: [
        //         {
        //             id: "1",
        //             user_id: "1",
        //             title: "title1",
        //             content: "this is good content",
        //             image: "https:\/\/via.placeholder.com\/600\/771796"
        //         },
        //         {
        //             id: "2",
        //             user_id: "1",
        //             title: "title2",
        //             content: "this is good content",
        //             image: "https:\/\/via.placeholder.com\/600\/771796"
        //         }
        //     ],
        //     count: 12
        // };
        
        const data = await res.json();
        console.log('data', data);
        return data;
    };

    useEffect(() => {

        fetchPosts(pageSize, offset).then((posts) => {
            setPostsTotal(posts.count);
            setPosts(posts.posts);
        });
    }, [currentPage, pageSize, offset])

    return (
        <Paginator
            pagesQuantity={pagesQuantity}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            activeStyles={activeStyles}
            normalStyles={normalStyles}>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                {posts.map(function(id, title, content, user_id, image){
                    return <PostList key={id} id={id} title={title} content={content} userId={user_id}
                        image={image}/>
                })}
            <Container align="center" justify="space-between" w="full" p={4} marginTop={'50px'}>
                <PageGroup isInline align="center"/>
            </Container>
            </Grid>
        </Paginator>
    )
}