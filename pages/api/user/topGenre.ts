import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req: req });

  try {
    if (!session) throw session;

    const response = await fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    const data = await response.json();

    res.status(200).json({ topGenre: data.items[0].genres });
  } catch (e) {
    res.status(401).end();
  }
}
