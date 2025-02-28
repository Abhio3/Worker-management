import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Textarea,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BASE_URL } from "../App";

function EditModal({ setUsers, user }) { // Destructured props here
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false); // Corrected 'false'
    const [inputs, setInputs] = useState({
        name: user.name,
        role: user.role,
        description: user.description,
        gender: user.gender,
    });
    const toast = useToast();

    const handleEditUser = async (e) => {
        e.preventDefault(); // Corrected 'preventDefault'
        setIsLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/friends/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json", // Corrected Content-Type
                },
                body: JSON.stringify(inputs),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }
            setUsers((prevUsers) => prevUsers.map((u) => u.id === user.id ? data : u));
            toast({
                title: "Plan Updated Successfully", // Changed title to reflect update action
                status: "success", // Corrected spelling from "Sucess" to "success"
                duration: 2000,
                isClosable: true,
                position: "top-center",
            });
            onClose();
        } catch (error) {
            toast({
                title: "An Error Occurred",
                description: error.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false); // Corrected this line
        }
    };

    return (
        <>
            <IconButton
                onClick={onOpen}
                variant='ghost'
                colorScheme='blue'
                aria-label='See menu'
                size={"sm"}
                icon={<BiEditAlt size={20} />}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={handleEditUser}>
                    <ModalContent>
                        <ModalHeader>Edit Worker</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Flex alignItems={"center"} gap={4}>
                                <FormControl>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input
                                        placeholder='Eg.Swathi '
                                        value={inputs.name}
                                        onChange={(e) => setInputs((prev) => ({ ...prev, name: e.target.value }))} 
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Role</FormLabel>
                                    <Input
                                        placeholder='Subject'
										required
                                        value={inputs.role}
                                        onChange={(e) => setInputs((prev) => ({ ...prev, role: e.target.value }))} 
                                    />
                                </FormControl>
                            </Flex>
                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    resize={"none"}
                                    overflowY={"hidden"}
                                    placeholder="New Learning on AI "
                                    value={inputs.description}
                                    onChange={(e) => setInputs((prev) => ({ ...prev, description: e.target.value }))} 
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Status</FormLabel>
                                <RadioGroup 
                                    value={inputs.gender} // Bind the selected value
                                    onChange={(value) => setInputs((prev) => ({ ...prev, gender: value }))} // Update gender in state
                                >
                                    <Flex gap={5}>
                                        <Radio value="male">Done </Radio>
                                        <Radio value="female">Yet To Complete</Radio>
                                    </Flex>
                                </RadioGroup>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} type="submit" isLoading={isLoading}>
                                Update
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
}

export default EditModal;
