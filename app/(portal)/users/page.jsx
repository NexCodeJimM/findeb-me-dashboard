"use client";
import { useEffect, useState } from "react";

import {
  Box,
  Button,
  TableContainer,
  Table,
  Td,
  Tr,
  Text,
  Thead,
  Th,
  Tbody,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Users = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Error fetching users:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Error deleting user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <Text marginBottom="1rem" fontSize="3xl" fontWeight="bold">
        User Management
      </Text>
      <Box
        maxWidth="1280px"
        bgColor="white"
        margin="0 auto"
        padding="2rem"
        rounded="lg"
      >
        {/* Button */}
        <Link href="/users/add-user">
          <Button colorScheme="green">+ Add User</Button>
        </Link>

        {/* Table Users */}
        <TableContainer marginTop="1.5rem">
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Position</Th>
                <Th>Location</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>

            <Tbody fontSize="sm">
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>FDB{user.employeeId}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.phone}</Td>
                  <Td>{user.position}</Td>
                  <Td>{user.address}</Td>
                  <Td>
                    <Button
                      colorScheme="blue"
                      marginRight="0.5rem"
                      fontSize="sm"
                      onClick={() => {
                        router.push(`/users/${user.id}`);
                      }}
                    >
                      View
                    </Button>

                    <Button
                      onClick={() => {
                        handleDelete(user.id);
                      }}
                      colorScheme="red"
                      fontSize="sm"
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Users;
