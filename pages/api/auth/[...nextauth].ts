import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";
import { signIn } from "next-auth/react";

export default NextAuth({
  secret: process.env.SECRET_HASH,
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_SECRET_KEY!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token!;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "http://localhost:3000/api/auth/sigin",
  },
  debug: true,
});
