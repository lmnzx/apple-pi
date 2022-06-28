import {
  Button,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  email: string;
};

export default function SignInModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);

    await fetch("http://localhost:8000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Sign In
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign In Now</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <ModalBody>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input id="email" type="email" {...register("email")} />
                <FormHelperText>We'll never share your email.</FormHelperText>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="cyan" type="submit">
                  Join
                </Button>
              </ModalFooter>
            </FormControl>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
