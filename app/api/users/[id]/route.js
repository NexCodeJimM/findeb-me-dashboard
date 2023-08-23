import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new NextResponse("Error fetching user", { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { name } = await request.json();

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return new NextResponse("Error updating user", { status: 500 });
  }
}
