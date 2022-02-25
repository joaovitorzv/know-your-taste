import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req: req });

  if (req.method === "POST") {
    try {
      if (!session) throw session;
      const { id } = req.query;

      await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: req.body,
      });

      res.status(204);
    } catch (e) {
      res.status(403).end();
    }
  }

  try {
    if (!session) throw session;

    const { next, limit } = req.query;

    if (!next) {
      const response = await fetch(
        `https://api.spotify.com/v1/me/playlists?limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      const data = await response.json();

      res.status(200).json(data);
    } else {
      const response = await fetch(next as string, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      const data = await response.json();

      res.status(200).json(data);
    }
  } catch (e) {
    res.status(403).end();
  }
}
