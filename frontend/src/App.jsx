import { Container, Stack, Text } from "@chakra-ui/react";
import Nav from "./components/Nav";
import UserGrid from "./components/UserGrid";

function App() {
  return (
    <Stack minH="100vh">
      <Nav />

      <Container maxW="90%" my={4}>
        <Text
          fontSize={{ base: "20px", md: "50px" }}  
          fontWeight={"bold"}
          letterSpacing={"2px"}
          textTransform={"uppercase"}
          textAlign={"center"}
          mb={8}
        >
          Workers Module 
        </Text>

        <UserGrid />  

      </Container>
     
    </Stack>
  );
}

export default App;
