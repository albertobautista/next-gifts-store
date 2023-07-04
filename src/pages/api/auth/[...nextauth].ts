import { dbUsers } from "gifts-store/database";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

import GithubProvider from "next-auth/providers/github";
export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Correo", type: "email", placeholder: "correo" },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "contraseña",
        },
      },
      async authorize(credentials) {
        return await dbUsers.checkUserByEmailAndPassword(
          credentials!.email,
          credentials!.password
        );
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  session: {
    maxAge: 2592000,
    strategy: "jwt",
    updateAge: 86400,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case "oauth":
            token.user = await dbUsers.oAuthToDbUser(
              user?.email || "",
              user?.name || "",
              user?.image || ""
            );
            break;

          case "credentials":
            token.user = user;
            break;
        }
      }

      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken as any;
      session.user = token.user as any;

      return session;
    },
  },
};
export default NextAuth(authOptions);
