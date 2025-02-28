import { Flex, Grid, Spinner, Text } from '@chakra-ui/react';  // Added Text import
import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import { BASE_URL } from '../App';

const UserGrid = ({ users, setUsers }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(BASE_URL + "/friends");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }

        // Here we update the users state with the fetched data
        setUsers(data);

      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();
  }, [setUsers]);

  return (
    <>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)"
        }}
        gap={4}
      >
        {users.map((user) => (
          <UserCard key={user.id} user={user} setUsers={setUsers}/>
        ))}
      </Grid>

      {/* Display message when no users are found */}
      {!isLoading && users.length === 0 && (
        <Flex justifyContent={"center"} mt={4}>
          <Text fontSize={"xl"}>
            <Text as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
              Oops !
            </Text>
            No Plan found.
          </Text>
        </Flex>
      )}
    </>
  );
};

export default UserGrid;
