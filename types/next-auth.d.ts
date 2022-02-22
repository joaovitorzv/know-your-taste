import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import { ERROR } from "pages/api/auth/[...nextauth]";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    error?: ERROR | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string | undefined;
    refreshToken: string | undefined;
    expiresAt: number;
    error?: ERROR | null;
  }
}

export interface RefreshTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
}

export enum AUTH_ERROR {
  REFRESH_TOKEN = "refresh_token_error",
}
