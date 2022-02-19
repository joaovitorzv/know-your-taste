import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req: req });
  if (!session) res.status(401).end();

  res.status(200).json({
    name: session?.user?.name,
    image: session?.user?.image,
  });
}
