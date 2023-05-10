import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        try {
          const response = await axios.post(`${process.env.API}/api/login/`, {
            email,
            password,
          });
          const { user } = response.data;
          // console.log("user: ", { user });
          return { user };
        } catch (error) {
          throw new Error("Failed to login");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    // signOut: "/login",
    // error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = user;
      }
      return Promise.resolve(token);
    },
    async session({ session, token, user }) {
      session = token;
      console.log(session);
      return Promise.resolve(session);
    },
  },
  secret: "mysecret",
});
