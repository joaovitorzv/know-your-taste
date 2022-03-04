import Layout from "components/Layout/layout";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { AUTH_ERROR } from "../../types/next-auth.d";

const MyTaste: NextPage = () => {
  const session = useSession();
  useEffect(() => {
    if (session.data?.error === AUTH_ERROR.REFRESH_TOKEN)
      signIn("spotify", { callbackUrl: "http://localhost:3000/my-taste" });
  }, [session]);

  return <Layout />;
};

export default MyTaste;
