import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    _id: string;
  }
  interface User {
    picture?: string;
  }
}
