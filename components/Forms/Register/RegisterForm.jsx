"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  FormControl,
  FormLabel,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  useToast,
} from "@chakra-ui/react";

export default function RegisterForm() {
  const toast = useToast();
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    employeeId: "",
    phone: "",
    address: "",
    password: "",
    role: "",
    position: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    if (response.ok) {
      // Show success toast
      toast({
        title: "User Added",
        description: "The user has been successfully added.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }

    const body = await response.json();
    console.log(body);
    router.push("/users");
  };

  return (
    <form onSubmit={registerUser} method="POST">
      <FormControl>
        <FormLabel>Full Name</FormLabel>
        <Input
          marginBottom="1rem"
          type="text"
          id="name"
          placeholder="John Doe"
          required
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <FormLabel>Employee ID</FormLabel>
        <InputGroup>
          <InputLeftAddon children="FDB" />
          <Input
            marginBottom="1rem"
            type="text"
            id="employeeId"
            placeholder="001"
            required
            value={data.employeeId}
            onChange={(e) => setData({ ...data, employeeId: e.target.value })}
          />
        </InputGroup>

        <FormLabel>Email Address</FormLabel>
        <Input
          marginBottom="1rem"
          type="email"
          id="email"
          placeholder="john@website.com"
          required
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <FormLabel>Phone Number</FormLabel>
        <Input
          marginBottom="1rem"
          type="number"
          id="phone"
          placeholder="+971 00 000 0000"
          required
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />

        <FormLabel>Position</FormLabel>
        <Input
          marginBottom="1rem"
          type="text"
          id="position"
          placeholder="Manager"
          required
          value={data.position}
          onChange={(e) => setData({ ...data, position: e.target.value })}
        />

        <FormLabel>Role</FormLabel>
        <Input
          marginBottom="1rem"
          type="text"
          id="role"
          placeholder="user/admin"
          required
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value })}
        />

        <FormLabel>Address</FormLabel>
        <Input
          marginBottom="1rem"
          type="text"
          id="address"
          placeholder="Dubai, UAE"
          required
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />

        <FormLabel>Password</FormLabel>
        <Input
          marginBottom="1rem"
          type="password"
          id="password"
          placeholder="Password"
          required
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </FormControl>

      <Button type="submit" colorScheme="green" marginY="1rem">
        Add User
      </Button>
    </form>
  );
}
