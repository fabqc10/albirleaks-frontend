import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    authToken?: string;  // Add authToken here
    idToken?:string
    user: {
      id: string;
      email: string;
      name: string;
      image?: string | null;
      accessToken?: string; 
      idToken?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    authToken?: string;
    id?: string;
    idToken?: string; // Add idToken here
  }
}
