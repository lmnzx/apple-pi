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
  Text,
} from "@chakra-ui/react";

import { EmailIcon } from "@chakra-ui/icons";

import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  email: string;
};

export default function SignInModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, isSubmitting, errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
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
                {isSubmitSuccessful ? (
                  <Text fontSize="1xl" color="cyan" mb={4}>
                    <EmailIcon color="white" w={6} h={6} mt={-1} mr={3} />
                    Check your email for a verification link.
                  </Text>
                ) : (
                  <Button
                    colorScheme="cyan"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Join
                  </Button>
                )}
              </ModalFooter>
            </FormControl>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
