import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req: req });

  try {
    if (!session) throw session;

    const { type } = req.query;
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/${type}?time_range=short_term&limit=5`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (e) {
    res.status(401).end();
  }
}
