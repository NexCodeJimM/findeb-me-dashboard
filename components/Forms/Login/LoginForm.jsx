"use client";
import {
  Flex,
  Box,
  Text,
  Image,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
} from "@chakra-ui/react";

import { FaUser, FaLock } from "react-icons/fa";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

const LoginForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = (e) => {
    e.preventDefault();
    signIn("credentials", {
      ...data,
      redirect: false,
    });
    router.push("/dashboard");
  };

  // If the user is already logged in, redirect to the dashboard
  if (session) {
    router.push("/dashboard"); // Update the path to your dashboard page
    return null; // You can also show a loading message here if you prefer
  }

  return (
    <Flex
      minHeight="100vh"
      margin="0 auto"
      bgColor="gray.100"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        maxWidth="1280px"
        padding="2rem"
        bgColor="white"
        rounded="xl"
        shadow="md"
      >
        <Image src="/assets/images/logo.png" alt="logo" width="15rem" />
        <Text marginY="1rem" fontWeight="bold" fontSize="xl">
          Account Login
        </Text>

        {/* Form */}
        <form onSubmit={loginUser} method="POST">
          <FormControl>
            <FormLabel>Email Address</FormLabel>
            <InputGroup>
              <InputLeftAddon pointerEvents="none">
                <FaUser color="#404040" size="0.8rem" />
              </InputLeftAddon>
              <Input
                type="email"
                placeholder="john@findebme.com"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </InputGroup>

            <FormLabel marginTop="1rem">Password</FormLabel>
            <InputGroup>
              <InputLeftAddon pointerEvents="none">
                <FaLock color="#404040" size="0.8rem" />
              </InputLeftAddon>
              <Input
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </InputGroup>

            <Button type="submit" marginTop="1rem" colorScheme="green">
              Login
            </Button>
          </FormControl>
        </form>
      </Box>
    </Flex>
  );
};

export default LoginForm;
