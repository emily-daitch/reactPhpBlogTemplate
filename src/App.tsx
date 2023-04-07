import SinglePost from './components/blogComponents/SinglePost';
import NotFound from './components/blogComponents/NotFound';
import './App.css';
import Main from './components/Main';
import Contact from './components/Pages/Contact';
import Strava from './components/Pages/Strava';
import Resume from './components/Pages/Resume';
import Calendar from './components/Pages/Calendar';
import Login from './components/Pages/Login';
import { ChakraProvider, Box, ListItem, UnorderedList, HStack, Spacer,
    Stack, Switch, Container, useDisclosure, Button, Modal, ModalContent,
    ModalHeader, ModalFooter, ModalOverlay, ModalBody, FormControl,
    Input, Flex } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { MoonIcon, SunIcon, Search2Icon } from '@chakra-ui/icons';
import { Wrapper } from './App.styles';

type SearchResultItem = {
  id: string,
  title: string
}

function App() {
    const [storedTheme, setStoredTheme] = useLocalStorage('theme', 'dark');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResultItems, setSearchResultItems] = useState([]);
    const [isSwitchOn, setIsSwitchOn] = useState(storedTheme === 'dark' ? true : false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);

    const onCloseClear = () => {
        onClose();
        setSearchResultItems([]);
    };

    const env = process.env.REACT_APP_STAGE;
    const url = process.env.REACT_APP_URL;
    const certed = process.env.REACT_APP_CERTED;
    console.log('certed ', certed);
    const protocol = certed === 'false' ? 'http' : 'https';

    useEffect(() => {
        const fetchSearchResults = async (searchTerm: string) => {
            console.log('fetching with search term', searchTerm);
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
    }, [searchTerm, env]);

    // Hook
    function useLocalStorage(key: string, initialValue: string) {
        // State to store our value
        // Pass initial state function to useState so logic is only executed once
        const [storedValue, setStoredValue] = useState(() => {
            if (typeof window === 'undefined') {
                return initialValue;
            }
            try {
                // Get from local storage by key
                const item = window.localStorage.getItem(key);
                // Parse stored json or if none return initialValue
                return item ? JSON.parse(item) : initialValue;
            } catch (error) {
                // If error also return initialValue
                console.log(error);
                return initialValue;
            }
        });
        // Return a wrapped version of useState's setter function that ...
        // ... persists the new value to localStorage.
        const setValue = (value: any) => {
            try {
                // Allow value to be a function so we have same API as useState
                const valueToStore =
        value instanceof Function ? value(storedValue) : value;
                // Save state
                setStoredValue(valueToStore);
                // Save to local storage
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(key, JSON.stringify(valueToStore));
                }
            } catch (error) {
                // A more advanced implementation would handle the error case
                console.log(error);
            }
        };
        return [storedValue, setValue];
    }

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
        <Wrapper test={storedTheme} style={{paddingBottom: 300}}>
            <ChakraProvider>
                <BrowserRouter>
                    <Box  p={4} 
                        bg={ storedTheme === 'light' ? '#333' : '#fff'}
                        borderBottom={ storedTheme === 'light' ? 'solid 1px #333' : 'solid 1px #fff'}
                        color={ storedTheme === 'light' ? '#fff' : '#333'}>
                        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                            <HStack spacing={16} alignItems={'left'}>
                                <HStack as={'nav'}
                                    spacing={6} 
                                    display={{base: 'fake', md: 'flex'}}>
                                    <Link to="/">
                            Home
                                    </Link>
                                    <Link to="/contact">
                            Contact
                                    </Link>
                                    <Link to="/resume">
                            Resume
                                    </Link>
                                    <Link to="/calendar">
                            Calendar
                                    </Link>
                                    <Link to="/strava">
                            Strava
                                    </Link>
                                </HStack>
                            </HStack>
                            <Search2Icon onClick={onOpen}>

                            </Search2Icon>
                            <Flex alignItems={'center'}>
                                <Spacer></Spacer>
                                <Stack direction={'row'} spacing={7}>
                                    <Link to="/login">
                                        Login
                                    </Link>
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
                        <Container maxW="1200px" marginTop={'50px'} height={'100vh'}>
                            <Routes>
                                <Route path="/" element={<Main theme={storedTheme}/>}/>
                                <Route path="/contact" element={<Contact theme={storedTheme}/>}/>
                                <Route path="/strava" element={<Strava theme={storedTheme}/>}/>
                                <Route path="/resume" element={<Resume theme={storedTheme}/>}/>
                                <Route path="/calendar" element={<Calendar theme={storedTheme}/>}/>
                                <Route path="/login" element={<Login theme={storedTheme}/>}/>
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
