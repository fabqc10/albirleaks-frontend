import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      console.log("JWT callback", { token, account, user });
      if (account) {
        token.accessToken = account.access_token;
        if (user) {
          token.id = user.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback", { session, token });
      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
