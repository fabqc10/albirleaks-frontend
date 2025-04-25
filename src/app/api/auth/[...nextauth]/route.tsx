import NextAuth, { Account, Profile, Session, User as AdapterUser, SessionStrategy } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { findBackendUserByGoogleId } from '@/lib/backendAuth';
import { sendTokenToBackend } from '@/utils/authUtils';

// Tipos actualizados en src/types/next-auth.d.ts

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async jwt({ token, account, profile }: { token: JWT; account?: Account | null; profile?: Profile }): Promise<JWT> {
      const isSignIn = !!account;

      // 1. Datos iniciales del proveedor (Google)
      let currentIdToken = token.idToken; // Token de la sesión actual (si existe)
      if (isSignIn && account && profile) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        currentIdToken = account.id_token; // <-- Usar el idToken fresco de la cuenta al iniciar sesión
        token.googleId = profile.sub;
        token.name = profile.name;
        token.email = profile.email;
        token.picture = (profile as any).picture;
        delete token.dbId;
        delete token.role;
        delete token.error;
        console.log(`[AUTH_JWT] Sign-in flow: Captured googleId: ${token.googleId}`);
      }

      // 2. Buscar datos del backend (dbId, role) si tenemos googleId y aún no los tenemos en el token
      const googleIdToSearch = token.googleId;
      if (googleIdToSearch && !token.dbId && !token.error) {
        console.log(`[AUTH_JWT] dbId missing. Attempting findBackendUserByGoogleId for ${googleIdToSearch}. Providing idToken.`);
        try {
          const backendUserData = await findBackendUserByGoogleId(googleIdToSearch, currentIdToken ?? null);
          if (backendUserData && backendUserData.userId) {
            token.dbId = backendUserData.userId;
            token.role = backendUserData.role;
            console.log(`[AUTH_JWT] Found existing backend user: dbId=${token.dbId}, role=${token.role}`);
          } else {
            console.warn(`[AUTH_JWT] User ${googleIdToSearch} not found via findBackendUserByGoogleId. Needs sync.`);
          }
        } catch (error) {
          console.error("[AUTH_JWT] Error calling findBackendUserByGoogleId:", error);
          token.error = "BackendLookupFailed";
        }
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      // 3. Sincronizar/Crear usuario en backend si es necesario
      if (token.idToken && !token.dbId && token.googleId && !token.error) {
        console.log(`[AUTH_SESSION] dbId missing for ${token.googleId}, attempting sync/create via sendTokenToBackend.`);
        try {
          const syncResult = await sendTokenToBackend(token.idToken);
          if (syncResult) {
            console.log("[AUTH_SESSION] sendTokenToBackend call presumed successful.");
          } else {
            console.error("[AUTH_SESSION] sendTokenToBackend failed or returned falsy.");
            token.error = token.error ? `${token.error}, BackendSyncFailed` : "BackendSyncFailed";
          }
        } catch (syncError) {
          console.error("[AUTH_SESSION] Error during sendTokenToBackend call:", syncError);
          token.error = token.error ? `${token.error}, BackendSyncFailed` : "BackendSyncFailed";
        }
      }

      // 4. Poblar el objeto Session con datos del Token
      (session as any).accessToken = token.accessToken;
      (session as any).idToken = token.idToken;
      if (token.error) {
        (session as any).error = token.error;
      }

      if (session.user) {
        session.user.id = token.sub ?? token.googleId ?? 'fallback-id';
        (session.user as any).dbId = token.dbId;
        (session.user as any).googleId = token.googleId;
        (session.user as any).role = token.role;
        session.user.name = token.name ?? session.user.name;
        session.user.email = token.email ?? session.user.email;
        session.user.image = token.picture ?? session.user.image;
      } else {
        session.user = {
          id: token.sub ?? token.googleId ?? 'fallback-id',
          dbId: token.dbId,
          googleId: token.googleId,
          role: token.role,
          name: token.name,
          email: token.email,
          image: token.picture,
        } as any;
      }

      console.log("[AUTH_SESSION] Returning session:", JSON.stringify(session, null, 2));
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
