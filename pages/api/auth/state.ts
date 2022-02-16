import type { NextApiRequest, NextApiResponse } from "next";
import { get, del, auth } from "@upstash/redis";

type AuthParams = NextApiRequest & {
  query: {
    compare: string;
  };
};

export default async function handler(req: AuthParams, res: NextApiResponse) {
  const stateParam = req.query.compare;

  auth(process.env.REDIS_URL, process.env.REDIS_TOKEN);

  try {
    if (!stateParam || stateParam === "undefined") throw false;

    const { data, error } = await get(stateParam);
    if (!data || error) throw false;

    await del(stateParam);
    res.status(200).json({ valid: true });
  } catch (e) {
    res.status(406).json({ valid: false });
  }
}
