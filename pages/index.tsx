import styles from "@/styles/Home.module.css";
import SigninBtn from "components/SigninBtn/signinBtn";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

type Props = {
  params: {
    callbackError: string;
  };
};

const Home: NextPage<Props> = ({ params }) => {
  return (
    <div className={styles.container}>
      <h1>Something wonderful is coming!</h1>

      <SigninBtn callbackError={params.callbackError} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.query;
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: true,
      },
    };
  }

  return {
    props: {
      params,
    },
  };
};

export default Home;
