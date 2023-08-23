"use client";
import RegisterForm from "@/components/Forms/Register/RegisterForm";
import { Box, Text } from "@chakra-ui/react";

const AddUser = () => {
  return (
    <>
      <Text marginBottom="1rem" fontSize="3xl" fontWeight="bold">
        Add a User
      </Text>

      <Box
        maxWidth="1280px"
        bgColor="white"
        margin="0 auto"
        padding="2rem"
        rounded="lg"
      >
        <RegisterForm />
      </Box>
    </>
  );
};

export default AddUser;
