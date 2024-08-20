import NextAuth, { Account, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { sendTokenToBackend } from '@/utils/authUtils';  // Adjust this path according to your project structure

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: JWT; account?: Account | null }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.accessToken = token.accessToken;
        session.idToken = token.idToken;
        session.user.id = token.sub!;
        
        // Call the function here
        const idToken = token.idToken;
        if (idToken) {
          const result = await sendTokenToBackend(idToken);
          if (!result) {
            console.error("Failed to send ID token to backend.");
          }
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
