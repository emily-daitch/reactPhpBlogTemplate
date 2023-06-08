import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './App.css';
import { Wrapper } from './App.styles';

import Main from './components/Main';
import Contact from './components/Pages/Contact';
import Strava from './components/Pages/Strava';
import Resume from './components/Pages/Resume';
import Calendar from './components/Pages/Calendar';
import SinglePost from './components/blogComponents/SinglePost';
import NotFound from './components/blogComponents/NotFound';
import { useLocalStorage } from './utils/useLocalStorage';

import { ChakraProvider, Box, ListItem, UnorderedList, Spacer,
    Stack, Switch, Container, useDisclosure, Button, Modal, ModalContent,
    ModalHeader, ModalFooter, ModalOverlay, ModalBody, FormControl,
    Input, Flex, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { MoonIcon, SunIcon, Search2Icon, ChevronDownIcon } from '@chakra-ui/icons';

type SearchResultItem = {
  id: string,
  title: string
}

function App() {
    const [storedTheme, setStoredTheme] = useLocalStorage('theme', 'dark');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResultItems, setSearchResultItems] = useState([]);
    const [isSwitchOn, setIsSwitchOn] = useState(storedTheme === 'dark' ? true : false);

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

            const res = await fetch(
                `${protocol}://${url}/api/searchResults?keyword=${searchTerm}`
            );
  
          
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

    const changeThemeSwitch = () => {
        let newValue = null;
        newValue = !isSwitchOn;

        setIsSwitchOn(newValue);

        !isSwitchOn ? setStoredTheme('dark') : setStoredTheme('light');
    };

    function slug(str: string) {
        return str.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }

    return (
        <Wrapper test={storedTheme}>
            <ChakraProvider>
                <BrowserRouter>
                    <Box  p={4} 
                        bg={ storedTheme === 'light' ? '#333' : '#fff'}
                        borderBottom={ storedTheme === 'light' ? 'solid 1px #333' : 'solid 1px #fff'}
                        color={ storedTheme === 'light' ? '#fff' : '#333'}>
                        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                            <Menu>
                                <MenuButton as={Button} 
                                    rightIcon={<ChevronDownIcon />} 
                                    color={storedTheme === 'light' ? '#fff' : '#333'}
                                    bg={storedTheme === 'light' ? '#222' : '#eee'}>
                                    Menu
                                </MenuButton>
                                <MenuList
                                    color={storedTheme === 'light' ? '#fff' : '#333'}
                                    bg={storedTheme === 'light' ? '#222' : '#eee'}>
                                    <MenuItem as="a" href="/"
                                        color={storedTheme === 'light' ? '#fff' : '#333'}
                                        bg={storedTheme === 'light' ? '#222' : '#eee'}>
                                        Home
                                    </MenuItem>
                                    <MenuItem as="a" href="/contact"
                                        color={storedTheme === 'light' ? '#fff' : '#333'}
                                        bg={storedTheme === 'light' ? '#222' : '#eee'}>
                                        Contact
                                    </MenuItem>
                                    <MenuItem as="a" href="/resume"
                                        color={storedTheme === 'light' ? '#fff' : '#333'}
                                        bg={storedTheme === 'light' ? '#222' : '#eee'}>
                                        Resume
                                    </MenuItem>
                                    <MenuItem as="a" href="/calendar"
                                        color={storedTheme === 'light' ? '#fff' : '#333'}
                                        bg={storedTheme === 'light' ? '#222' : '#eee'}>
                                        Calendar
                                    </MenuItem>
                                    <MenuItem as="a" href="/strava"
                                        color={storedTheme === 'light' ? '#fff' : '#333'}
                                        bg={storedTheme === 'light' ? '#222' : '#eee'}>
                                        Strava
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                            <Search2Icon onClick={onOpen}>

                            </Search2Icon>
                            <Flex alignItems={'center'}>
                                <Spacer></Spacer>
                                <Stack direction={'row'} spacing={7}>
                                    <Switch isChecked={isSwitchOn} onChange={changeThemeSwitch}>
                                        {isSwitchOn ? (<MoonIcon mr="5"></MoonIcon>) : (<SunIcon mr="5"></SunIcon>)}
                                    </Switch>
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
                                <ModalHeader color={storedTheme === 'light' ? '#333' : '#fff'} bg={storedTheme === 'light' ? '#fff' : '#333'}
                                >
                    Type keyword to search
                                </ModalHeader>
                                <ModalBody  bg={storedTheme === 'light' ? '#fff' : '#333'} pb={6}>
                                    <FormControl mt={4}>
                                        <Input placeholder=''
                                            ref={initialRef}
                                            color={storedTheme === 'light' ? '#333' : '#fff'}
                                            onChange={(e)=> setSearchTerm(e.target.value)}
                                        />
                                    </FormControl>
                                    <br/>
                                    {searchResultItems && 
                      <UnorderedList>{searchResultItems.map(function(item: SearchResultItem){return (<Link to={slug(item.title)} key={item.id} state={item.id}>
                          <ListItem color={storedTheme === 'light' ? '#333' : '#fff'}
                              bg={storedTheme === 'light' ? '#fff' : '#333'} key={item.id}>
                              {item.title}
                          </ListItem>
                      </Link>);
                      })}
                      </UnorderedList>
                                    }
                                </ModalBody>
                                <ModalFooter  bg={storedTheme === 'light' ? '#fff' : '#333'}>
                                    <Button bg={storedTheme === 'light' ? '#333' : '#fff'}
                                        color={storedTheme === 'light' ? '#fff' : '#333'} onClick={onCloseClear}>
                      Cancel
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </ModalOverlay>
                    </Modal>

                    <div className='App' style={{height:'100%'}}>
                        <Container maxW="1600px" marginTop={'50px'} minH={'100vh'} height={'100%'} justifyContent={'center'} alignContent={'center'}>
                            <Routes>
                                <Route path="/" element={<Main theme={storedTheme}/>}/>
                                <Route path="/contact" element={<Contact theme={storedTheme}/>}/>
                                <Route path="/strava" element={<Strava theme={storedTheme}/>}/>
                                <Route path="/resume" element={<Resume theme={storedTheme}/>}/>
                                <Route path="/calendar" element={<Calendar theme={storedTheme}/>}/>
                                <Route path=":slug" element={<SinglePost theme={storedTheme}/>}/>
                                <Route path="/404" element={<NotFound/>}/>
                            </Routes>
                        </Container>
                    </div>
                </BrowserRouter>
            </ChakraProvider>
        </Wrapper>
    );
}

export default App;
