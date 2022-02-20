import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";
import { RefreshTokenResponse } from "types/next-auth";

export enum ERROR {
  REFRESH_TOKEN = "refresh_token_error",
}

const scopes = ["user-read-email", "playlist-read-private"];
const scopes_param = scopes.join("%20");

async function refreshToken(token: JWT): Promise<JWT> {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_SECRET_KEY
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: token.refreshToken!,
    }),
  });
  const data: RefreshTokenResponse = await response.json();

  if (response.ok) {
    return {
      accessToken: data.access_token,
      expiresAt: Date.now() + data.expires_in * 1000,
      refreshToken: token.refreshToken,
      error: null,
    };
  }

  return {
    ...token,
    error: ERROR.REFRESH_TOKEN,
  };
}

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_SECRET_KEY as string,
      authorization: `https://accounts.spotify.com/authorize?scope=${scopes_param}`,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = Date.now() + account.expires_at! * 1000;
      }

      if (Date.now() > token.expiresAt) {
        return refreshToken(token);
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken!;
      session.error = token.error;
      return session;
    },
  },
  pages: {
    signIn: "/api/auth/signin",
    error: "api/auth/error",
  },
  debug: true,
});
