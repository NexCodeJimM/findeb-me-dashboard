import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();
  const { name, employeeId, email, phone, password, address, position, role } =
    body.data;
  console.log(body.data);

  //   Check if the fields are not empty
  if (
    !name ||
    !employeeId ||
    !email ||
    !phone ||
    !password ||
    !address ||
    !position ||
    !role
  ) {
    return new NextResponse("Please fill all the fields", {
      status: 400,
    });
  }

  //   Check if user already exists
  const exist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (exist) {
    return new NextResponse("User already exists", {
      status: 400,
    });
  }

  //   Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  //   Create the user
  const user = await prisma.user.create({
    data: {
      name,
      employeeId,
      email,
      phone,
      position,
      role,
      address,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
