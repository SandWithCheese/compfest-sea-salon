import NextAuth from "next-auth";
import { authOptions } from "./auth-options";
import { UserPrivate, UserPublic } from "@/types/user";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

declare module "next-auth/jwt" {
  interface JWT extends UserPublic {}
}

declare module "next-auth" {
  interface Session extends UserPublic {}

  interface User extends UserPrivate {}
}
