import logo from './logo.svg';
import SinglePost from './components/blogComponents/SinglePost';
import NotFound from './components/blogComponents/NotFound';
import './App.css';
//import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Main from './components/Main';
import Contact from './components/Pages/Contact';
import { lightTheme, darkTheme, GlobalStyles } from './theme';
import { ThemeProvider } from "styled-components"
import { 
  ChakraProvider, 
  Box, 
  Grid, 
  VStack, 
  Text, 
  ListItem,
  UnorderedList,
  HStack,
  Spacer,
  Stack,
  Switch,
  Container,
  useDisclosure,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  ModalBody,
  FormControl,
  Input,
  Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { MoonIcon, SunIcon, Search2Icon } from '@chakra-ui/icons'

function App() {
  const [theme, setTheme] = useState("light");
  const [searchTerm, setSearchTerm] = useState([]);
  const [searchResultItems, setSearchResultItems] = useState([]);
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();

  const fetchSearchResults = async (searchTerm) => {
    console.log('searchTerm from fetch', searchTerm);
    const res = await fetch(
      `http://emilydaitch.click/searchResults.php?keyword=${searchTerm}`
    );

    console.log('res', res);
        
    const data = await res.json();
    console.log('data', data);
    return data;
    // return {
    //   posts: [
    //     {
    //       id: 1,
    //       title: 'testResult1'
    //     },
    //     {
    //       id: 2,
    //       title: 'testResult2'
    //     }
    //   ]
    // };
  }

  useEffect(() => {
    const getUsersInput = setTimeout(() => {
      console.log('searchTerm from useEffect', searchTerm);
      fetchSearchResults(searchTerm).then((item) => {
        setSearchResultItems(item.posts)
      })
    }, 100)

    return () =>clearTimeout(getUsersInput);
  }, [searchTerm])

  const changeThemeSwitch = () => {
    let newValue = null;
    newValue = !isSwitchOn;
    setIsSwitchOn(newValue);
    console.log(newValue);

    !newValue ? setTheme('dark') : setTheme('light');
  }

  function slug(string) {
    return string.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
  }

  return (
    <ChakraProvider>
      {/* <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end"/>
          <VStack spacing={8}>
            <Text>
              some content
            </Text>
            <Link color="teal.500"
                  href="https://google.com"
                  fontSize="2xl"
                  target="_blank"
                  >
              Explore More
            </Link>
          </VStack>
        </Grid>
      </Box> */}
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <BrowserRouter>
          <GlobalStyles/>
          <Box  p={4} 
                bg={ theme === 'light' ? '#333' : '#fff'}
                borderButton={ theme === 'light' ? 'solid 1px #333' : 'solid 1px #fff'}
                color={ theme === 'light' ? '#fff' : '#333'}>
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
                </HStack>
                </HStack>
                <Search2Icon onClick={onOpen}>

                </Search2Icon>
                <Flex alignItems={'center'}>
                  <Spacer></Spacer>
                  <Stack direction={'row'} spacing={7}>
                    <Switch onChange={changeThemeSwitch}>
                      {isSwitchOn ? (<MoonIcon mr="5"></MoonIcon>) : (<SunIcon mr="5"></SunIcon>)}
                    </Switch>
                  </Stack>
                </Flex>
              </Flex>
          </Box>

          <Modal initialFocusRef={initialRef}
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            motionPreset='slideInBottom'
            bg='blue'>
              <ModalOverlay bg='none'
                backgroundFilter='auto'
                backgroundInvert='80%'
                backdropBlur='2px'>
                  <ModalContent>
                  <ModalHeader color={theme === 'light' ? '#333' : '#fff'}
                  >
                    Type keyword to search
                  </ModalHeader>
                  <ModalBody pb={6}>
                    <FormControl mt={4}>
                      <Input placeHolder=''
                        ref={initialRef}
                        color={'#333'}
                        onChange={(e)=> setSearchTerm(e.target.value)}
                      />
                    </FormControl>
                    <br/>
                    {searchResultItems && 
                      <UnorderedList>
                        {searchResultItems.map(function(item){
                          console.log('item from search map', item);
                          return (<Link to={slug(item.title)} key={item.id} state={item.id}>
                            <ListItem key={item.id}>
                              {item.title}
                            </ListItem>
                          </Link>)
                        })}
                      </UnorderedList>
                    }
                  </ModalBody>
                  <ModalFooter>
                    <Button onCLick={onClose}>
                      Cancel
                    </Button>
                  </ModalFooter>
                  </ModalContent>
              </ModalOverlay>
          </Modal>

          <div className='App'>
            <Container maxW="1200px" marginTop={'50px'}>
              <Routes>
              <Route path="/" element={<Main />}/>
              <Route path="/contact" element={<Contact />}/>
              <Route path=":slug" element={<SinglePost/>}/>
              <Route path="/404" element={<NotFound/>}/>
              </Routes>
            </Container>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default App;
