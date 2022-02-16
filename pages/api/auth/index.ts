import { auth, set, expire } from "@upstash/redis";
import type { NextApiRequest, NextApiResponse } from "next";
import { URLSearchParams } from "url";
import { v4 as uuidv4 } from "uuid";

const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
const RESPONSE_TYPE = "code";
const STATE = uuidv4();
const SCOPE = "user-read-private";

type AuthParams = NextApiRequest & {
  query: {
    code?: string;
  };
};

export default async function handler(req: AuthParams, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      auth(process.env.REDIS_URL, process.env.REDIS_TOKEN);

      const { error } = await set(STATE, STATE);
      await expire(STATE, 600);
      if (error) throw error;

      const redirect_to = `https://accounts.spotify.com/authorize?response_type=${RESPONSE_TYPE}&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&state=${STATE}`;
      res.redirect(redirect_to);
    } catch (e) {
      res.status(501).end();
    }
  }

  if (req.method === "POST") {
    try {
      if (!req.query.code) throw false;

      const request_body = new URLSearchParams();
      request_body.append("grant_type", "authorization_code");
      request_body.append("code", req.query.code);
      request_body.append("redirect_uri", REDIRECT_URI!);

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_SECRET_KEY
          ).toString("base64")}`,
        },
        body: request_body,
      });

      if (response.status !== 200) throw false;
      const data = await response.json();

      res.status(200).json(data);
    } catch (e) {
      res.status(401).end();
    }
  }
}
