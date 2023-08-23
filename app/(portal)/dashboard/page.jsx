"use client";

import StatCard from "@/components/common/Cards/StatCard/StatCard";
import { Box, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cardDummyStat } from "@/components/common/Cards/StatCard/statConsts";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Check if user is logged in
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <Box maxWidth="1280px" margin="0 auto">
      {/* Page Title */}
      <Text fontWeight="bold" fontSize="3xl" marginBottom="1rem">
        Dashboard
      </Text>

      {/* Cards */}
      <Box
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        gap="2rem"
        alignItems={{ base: "center", sm: "flex-start" }}
        justifyContent={{ base: "center", sm: "flex-start" }}
      >
        {cardDummyStat.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </Box>
    </Box>
  );
}
