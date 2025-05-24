import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    authToken?: string;  // Add authToken here
    idToken?: string;
    error?: string;
    user: {
      id: string;
      dbId?: string;
      googleId?: string;
      role?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    dbId?: string;
    googleId?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    accessToken?: string;
    authToken?: string;
    idToken?: string;
    dbId?: string;
    googleId?: string;
    role?: string;
    error?: string;
  }
}
