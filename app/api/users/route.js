import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    // console.log("Users:", users);
    return new NextResponse(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse("Error fetching users", { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    console.log("Deleting user with ID:", id);

    const deleteUser = await prisma.user.delete({
      where: {
        id,
      },
    });
    console.log("Deleted user:", deleteUser);

    return new NextResponse(JSON.stringify(deleteUser), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new NextResponse("Error deleting user", { status: 500 });
  }
}
