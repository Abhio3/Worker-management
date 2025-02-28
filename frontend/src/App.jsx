import { Container, Stack, Text } from "@chakra-ui/react";
import Nav from "./components/Nav";
import UserGrid from "./components/UserGrid";
import { useState } from "react";
export const BASE_URL = "http://127.0.0.1:5000/api";

function App() {
  const [users,setUsers] = useState([]);
  return (
    <Stack minH="100vh">
      <Nav setUsers={setUsers} />

      <Container maxW="90%" my={4}>
        <Text
          fontSize={{ base: "20px", md: "50px" }}  
          fontWeight={"bold"}
          letterSpacing={"2px"}
          textTransform={"uppercase"}
          textAlign={"center"}
          mb={8}
        >
          Study Plans
        </Text>

        <UserGrid users={users} setUsers={setUsers} />  

      </Container>
     
    </Stack>
  );
}

export default App;
