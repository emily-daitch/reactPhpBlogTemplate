import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './App.css';
import ColorModeSwitcher from './components/blogComponents/ColorModeSwitcher';
import theme from './theme';

import Main from './components/Main';
import Contact from './components/Pages/Contact';
//import Strava from './components/Pages/Strava';
import Strava from './components/Pages/Strava_Canvas';
import Resume from './components/Pages/Resume';
import Calendar from './components/Pages/Calendar';
import SinglePost from './components/blogComponents/SinglePost';
import NotFound from './components/blogComponents/NotFound';
import { slug } from './utils/slug';

import { ChakraProvider, Box, ListItem, UnorderedList, Spacer,
    Stack, Container, useDisclosure, Button, Modal, ModalContent,
    ModalHeader, ModalFooter, ModalOverlay, ModalBody, FormControl,
    Input, Flex, Menu, MenuButton, MenuList, MenuItem, ColorModeScript } from '@chakra-ui/react';
import { Search2Icon, HamburgerIcon } from '@chakra-ui/icons';

type SearchResultItem = {
  id: string,
  title: string
}

function App() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResultItems, setSearchResultItems] = useState([]);

    const initialRef = React.useRef(null);

    const onCloseClear = () => {
        onClose();
        setSearchResultItems([]);
    };

    useEffect(() => {
        const env = process.env.REACT_APP_STAGE;
        const url = process.env.REACT_APP_URL;
        const certed = process.env.REACT_APP_CERTED;
        const protocol = certed === 'false' ? 'http' : 'https';
        
        const fetchSearchResults = async (searchTerm: string) => {
            let res;
            try{
                res = await fetch(
                    `${protocol}://${env}${url}/api/searchResults?keyword=${searchTerm}`
                );
            } catch(err){
                res = new Response('{}');
            }
  
          
            const data = await res.json();
            return data;
        };

        const getUsersInput = setTimeout(() => {
            fetchSearchResults(searchTerm).then((item) => {
                setSearchResultItems(item.posts);
            });
        }, 100);

        return () =>clearTimeout(getUsersInput);
    }, [searchTerm]);

    return (
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
            <BrowserRouter>
                <Box  p={0} className='opposite'>
                    <Flex h={16} alignItems={'center'} justifyContent={'space-between'} className='opposite'>
                        <Menu>
                            <MenuButton as={Button} 
                                rightIcon={<HamburgerIcon />} 
                                size='xl' variant='solid'
                            >
                                Menu
                            </MenuButton>
                            <MenuList
                                //as={Button}
                                //variant='solid'
                                border={'none'}
                            >
                                <MenuItem as='a' href='/' _focus={ { bg: '#444', color: '#9EE680' } }
                                >
                                    Home
                                </MenuItem>
                                <MenuItem as='a' href='/contact' _focus={ { bg: '#444', color: '#9EE680' } }
                                >
                                    Contact
                                </MenuItem>
                                <MenuItem as='a' href='/resume' _focus={ { bg: '#444', color: '#9EE680' } }
                                >
                                    Resume
                                </MenuItem>
                                <MenuItem as='a' href='/calendar' _focus={ { bg: '#444', color: '#9EE680' } }
                                >
                                    Calendar
                                </MenuItem>
                                <MenuItem as='a' href='/strava' _focus={ { bg: '#444', color: '#9EE680' } }
                                >
                                    Strava
                                </MenuItem>
                            </MenuList>
                        </Menu>
                        <Search2Icon onClick={onOpen}>

                        </Search2Icon>
                        <Flex alignItems={'center'}>
                            <Spacer></Spacer>
                            <Stack direction={'row'} spacing={7}>
                                <ColorModeSwitcher></ColorModeSwitcher>
                            </Stack>
                        </Flex>
                    </Flex>
                </Box>

                <Modal initialFocusRef={initialRef}
                    isCentered
                    onClose={onCloseClear}
                    isOpen={isOpen}
                    motionPreset='slideInBottom'
                >
                    <ModalOverlay 
                        backdropFilter='auto'
                        backdropInvert='80%'
                        backdropBlur='2px'>
                        <ModalContent>
                            <ModalHeader>
                                Type keyword to search
                            </ModalHeader>
                            <ModalBody pb={6}>
                                <FormControl mt={4}>
                                    <Input placeholder=''
                                        ref={initialRef}
                                        onChange={(e)=> setSearchTerm(e.target.value)}
                                    />
                                </FormControl>
                                <br/>
                                {searchResultItems && 
                    <UnorderedList>{searchResultItems.map(function(item: SearchResultItem){return (<Link to={slug(item.title)} key={item.id} state={item.id}>
                        <ListItem
                            key={item.id}>
                            {item.title}
                        </ListItem>
                    </Link>);
                    })}
                    </UnorderedList>
                                }
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={onCloseClear}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </ModalOverlay>
                </Modal>

                <div className='App' style={{height:'100%'}}>
                    <Container maxW="1600px" marginTop={'10px'} minH={'100vh'} height={'100%'} justifyContent={'center'} alignContent={'center'}>
                        <Routes>
                            <Route path="/" element={<Main/>}/>
                            <Route path="/contact" element={<Contact/>}/>
                            <Route path="/strava" element={<Strava/>}/>
                            <Route path="/resume" element={<Resume/>}/>
                            <Route path="/calendar" element={<Calendar/>}/>
                            <Route path=":slug" element={<SinglePost/>}/>
                            <Route path="/404" element={<NotFound/>}/>
                        </Routes>
                    </Container>
                </div>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
