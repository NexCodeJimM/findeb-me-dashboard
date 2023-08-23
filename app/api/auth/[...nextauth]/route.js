import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if email and password is valid
        if (!credentials.email || !credentials.password) {
          return null;
        }

        // Check if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // If user doesn't exist, return null
        if (!user) {
          return null;
        }

        // Check if password is valid
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // If password doesn't match, return null
        if (!passwordMatch) {
          return null;
        }

        // If everything is valid, return user
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      // console.log("JWT Callback", { token, user, session });

      // Update name to the token
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      // Add id and address to token
      if (user) {
        return {
          ...token,
          id: user.id,
          address: user.address,
        };
      }

      //   Update the user in the DB
      const newUser = await prisma.user.update({
        where: {
          id: token.id,
        },
        data: {
          name: token.name,
        },
      });
      // console.log("New User", newUser);

      return token;
    },
    async session({ session, token, user }) {
      // console.log("session callback", { session, token, user });
      // Add id and address to the session
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          address: token.address,
          name: token.name,
        },
      };
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
