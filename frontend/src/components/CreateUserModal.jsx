import { Button, Center, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure } from '@chakra-ui/react'
import { BiAddToQueue } from "react-icons/bi";
import React from 'react'

const CreateUserModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
    <Button mx={2} onClick={onOpen}> 
        <BiAddToQueue size={20} />
    </Button>
    <Modal
    isOpen={isOpen}
    onClose={onClose}>
        <ModalOverlay />
        <ModalContent> 
            <ModalHeader> New Worker </ModalHeader>
            <ModalCloseButton />
        <ModalBody pb={6}> 
            <Flex alignItems={"center"} gap={4}>
                
                <FormControl>
                    <FormLabel> Full Name </FormLabel>
                    <Input placeholder='Eg:Abhishek' />
                </FormControl>
               
                <FormControl>
                    <FormLabel> Role </FormLabel>
                    <Input placeholder='Eg:Software Enginer' />
                </FormControl>
                
            </Flex>
            <FormControl mt={2}>
                    <FormLabel> Description </FormLabel>
                    <Textarea resize={'none'}
                    overflow={"hidden"}
                    placeholder='Eg:He is a Software Engineer Who loves to code' />
                </FormControl>
                <RadioGroup  mt={4}>
                    <Flex gap={5}
                    >
                        <Radio value='male'> Male </Radio>
                        <Radio value='female'> Female </Radio>

                    </Flex>
                </RadioGroup>
       
        </ModalBody>
        <ModalFooter>
            <Button colorScheme='blue' mr={3}> Add </Button>
            <Button onClick={onClose}>  Close </Button>
        </ModalFooter>
        </ModalContent>
      
        

    </Modal>
    </>
  )
}

export default CreateUserModal;