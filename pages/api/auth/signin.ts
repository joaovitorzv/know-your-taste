import type { NextApiRequest, NextApiResponse } from "next";

type AuthParams = NextApiRequest & {
  query: {
    error: string;
    callbackUrl: string;
  };
};

export default async function handler(req: AuthParams, res: NextApiResponse) {
  const { query } = req;

  if (query.error) res.redirect("/?callbackError=true");
  if (query.callbackUrl) res.redirect("/");
  res.end();
}
