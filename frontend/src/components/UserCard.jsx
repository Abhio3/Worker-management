import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { BiTrash } from 'react-icons/bi';
import EditModal from './EditModal';
import { BASE_URL } from '../App';

const UserCard = ({ user, setUsers }) => {
    const toast = useToast();

    const handleDeleteUser = async () => {
        try {
            const res = await fetch(`${BASE_URL}/friends/${user.id}`, {  // Added a slash before user.id
                method: "DELETE",
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }
            setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
            toast({
                title: "Plan Deleted Successfully",
                status: "success", // Corrected spelling from "Sucess" to "success"
                duration: 2000,
                isClosable: true,
                position: "top-center"
            });
        } catch (error) {
            toast({
                title: "An Error Occurred",
                description: error.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <Flex gap={4}>
                    <Flex flex={1} gap={4} alignItems={"center"}>
                        <Avatar src={user.imgUrl} />
                        <Box>
                            <Heading size="sm">{user.name}</Heading>
                            <Text>{user.role}</Text>
                        </Box>
                    </Flex>
                    <EditModal 
                    user={user}
                    setUsers={setUsers}/>
                    <IconButton
                        variant="ghost"
                        colorScheme='red'
                        size={"sm"}
                        aria-label='Delete user'
                        icon={<BiTrash size={20} />} // Moved onClick from icon to IconButton
                        onClick={handleDeleteUser} // Moved here for better handling
                    />
                </Flex>
            </CardHeader>
            <CardBody>
                <Text>
                    {user.description}
                </Text>
            </CardBody>
        </Card>
    );
};

export default UserCard;
