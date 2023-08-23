"use client";

import { Box, StatGroup, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";

const StatCard = ({ label, value, icon }) => {
  return (
    <Box
      bgColor="white"
      width="20rem"
      padding="1.5rem"
      rounded="lg"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      shadow="md"
    >
      <StatGroup>
        <Stat>
          <StatLabel>{label}</StatLabel>
          <StatNumber>{value}</StatNumber>
        </Stat>
      </StatGroup>

      <Box>{icon}</Box>
    </Box>
  );
};

export default StatCard;
