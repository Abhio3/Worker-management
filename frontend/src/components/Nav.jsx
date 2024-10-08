import { Box, Container, Flex, Text, Button, useColorMode,useColorModeValue } from '@chakra-ui/react';  // Added useColorMode import
import { LuSun } from "react-icons/lu";
import { IoMoonSharp } from "react-icons/io5";
import CreateUserModal from './CreateUserModal';
import React from 'react';

const Nav = ({setUsers}) => {
  const { colorMode, toggleColorMode } = useColorMode();  // useColorMode now imported

  return (
    <Container>
      <Box
      
        bg={useColorModeValue("black","gray.700")}
        px={4}
        my={4}
        borderRadius={5}
      >
        <Flex
          h="16"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {/* LEFT SIDE */}
          <Flex
            alignItems={"center"}
            justifyContent={'space-between'}
            gap={3}
            display={{ base: 'none', sm: "flex" }}
          >
            <Text fontSize={"20px"} color={'white'}>Worker Management System</Text>
          </Flex>

          {/* RIGHT SIDE */}
          <Flex alignItems={"center"}>
            <Text fontSize={"10px"} color={'white'}>With Python</Text>
            <Button onClick={toggleColorMode} ml={2} padding={1}> {/* Added margin to space out the button */}
              {colorMode === "light" ? <IoMoonSharp /> : <LuSun size={10} />}
            </Button>
            <CreateUserModal setUsers={setUsers}/>
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
}

export default Nav;
