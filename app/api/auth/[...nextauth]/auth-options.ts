import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { compare } from "bcrypt";
import { eq } from "drizzle-orm";
import type { NextAuthOptions, AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import "server-only";

type Adapter = NextAuthOptions["adapter"];

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", placeholder: "Username", type: "text" },
        password: {
          label: "password",
          placeholder: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.username || !credentials.password) {
          return null;
        }

        // Find user in database
        const existingUser = await db.query.users.findFirst({
          where: eq(users.email, credentials.username),
        });

        if (!existingUser || !existingUser.password) {
          return null;
        }

        // Compare hashed password
        const passwordCheck = await compare(
          credentials.password,
          existingUser.password,
        );

        if (!passwordCheck) {
          return null;
        }

        return existingUser;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 86400,
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.phone = user.phone;
        token.role = user.role;
        token.picture = null;
      }

      // Update session
      if (trigger === "update") {
        // Get new data from db
        const userDB = (await db.query.users.findFirst({
          where: eq(users.id, token.id),
        })) as typeof users.$inferSelect;

        // Update token
        token.id = userDB.id;
        token.email = userDB.email;
        token.name = userDB.name;
        token.phone = userDB.phone;
        token.role = userDB.role;
        token.picture = null;
      }

      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      session.email = token.email ?? "";
      session.name = token.name ?? "";
      session.phone = token.phone;
      session.role = token.role;

      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
};
