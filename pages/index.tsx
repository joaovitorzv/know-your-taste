import styles from "@/styles/Home.module.css";
import SigninBtn from "components/SigninBtn/signinBtn";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";

type Props = {
  params?: {
    callbackError: string;
  };
  user?: string;
};

const Home: NextPage<Props> = ({ params, user }) => {
  return (
    <div className={styles.container}>
      {user && <span>logged in as {user}</span>}
      <hr />
      <Link href="/my-taste">know my taste</Link>{" "}
      <h1>Something wonderful is coming!</h1>
      {!user && <SigninBtn callbackError={params?.callbackError} />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.query;
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      props: {
        params,
      },
    };
  }
  console.log(session);

  return {
    props: {
      params,
      user: session?.user?.name,
    },
  };
};

export default Home;
