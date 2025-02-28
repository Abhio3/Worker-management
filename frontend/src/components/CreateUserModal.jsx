import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure, useToast } from '@chakra-ui/react';
import { BiAddToQueue } from "react-icons/bi";
import React, { useState } from 'react';
import { BASE_URL } from '../App';

const CreateUserModal = ({ setUsers }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        role: "",
        description: "",
        gender: ""
    });

    const toast = useToast();

    const handleCreateUser = async (e) => {
        e.preventDefault();  // Prevent default form submission

        // Validate fields before submitting
        const { name, role, description, gender } = inputs;
        if (!name || !role || !description || !gender) {
            toast({
                status: "warning",
                title: "Missing Fields",
                description: "All fields are required.",
                duration: 2000,
                position: "top-center",
            });
            return;  // Stop form submission if any field is empty
        }

        setIsLoading(true);
        try {
            const res = await fetch(BASE_URL + "/friends", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }
            toast({
                status: "success",
                title: "Success",
                description: "Worker added successfully.",
                duration: 2000,
                position: "top-center",
            });

            // Reset form inputs after successful creation
            setInputs({
                name: "",
                role: "",
                description: "",
                gender: ""
            });

            onClose(); 
            setUsers((prevUsers) => [...prevUsers, data]);

        } catch (error) {
            toast({
                status: "error",
                title: "Error",
                description: error.message,
                duration: 2000,
                position: "top-center",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button mx={2} onClick={onOpen}>
                <BiAddToQueue size={20} />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={handleCreateUser}>
                    <ModalContent>
                        <ModalHeader>New Plan</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Flex alignItems={"center"} gap={4}>
                                <FormControl>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input placeholder='Eg:Swathi' value={inputs.name}
                                        onChange={(e) => setInputs({ ...inputs, name: e.target.value })} />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Subject</FormLabel>
                                    <Input placeholder='Eg: AI' value={inputs.role}
                                        onChange={(e) => setInputs({ ...inputs, role: e.target.value })} />
                                </FormControl>
                            </Flex>
                            <FormControl mt={2}>
                                <FormLabel>Description</FormLabel>
                                <Textarea resize={'none'}
                                    overflow={"hidden"}
                                    placeholder='Eg: Enter the description ' value={inputs.description}
                                    onChange={(e) => setInputs({ ...inputs, description: e.target.value })} />
                            </FormControl>
                            <RadioGroup mt={4} value={inputs.gender} onChange={(value) => setInputs({ ...inputs, gender: value })}>
                                <Flex gap={5}>
                                    <Radio value='male'>Done</Radio>
                                    <Radio value='female'>Yet to Complete</Radio>
                                </Flex>
                            </RadioGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>Add</Button>
                            <Button onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
};

export default CreateUserModal;
