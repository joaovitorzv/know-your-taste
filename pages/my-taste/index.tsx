import Layout from "components/Layout/layout";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import { AUTH_ERROR } from "../../types/next-auth.d";

const MyTaste: NextPage = () => {
  const session = useSession();
  useEffect(() => {
    if (session.data?.error === AUTH_ERROR.REFRESH_TOKEN)
      signIn("spotify", { callbackUrl: "http://localhost:3000/my-taste" });
  }, [session]);

  return (
    <>
      <Head>
        <title>KYT - Discover</title>
      </Head>
      <Layout />
    </>
  );
};

export default MyTaste;
