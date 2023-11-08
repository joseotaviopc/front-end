import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        userName: {
          label: "email",
          type: "text",
          placeholder: "Insira seu nome de usuário ou e-mail",
        },
        password: {
          label: "password",
          type: "text",
          placeholder: "Insira sua senha",
        },
      },
      async authorize(credentials, req) {
        const response = await fetch("http://localhost:8081/api/v1/login", {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.userName,
            password: credentials?.password,
          }),
        });

        const data = await response.json();

        if (response.ok && data) {
          return data;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session = token.user as any;
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
