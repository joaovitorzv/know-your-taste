import type { NextApiRequest, NextApiResponse } from "next";
import { get, del, auth } from "@upstash/redis";

type AuthParams = NextApiRequest & {
  query: {
    error: string;
  };
};

export default async function handler(req: AuthParams, res: NextApiResponse) {
  res.redirect("/?callbackError=true");
}
