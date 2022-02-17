import styles from "@/styles/Home.module.css";
import SignoutBtn from "components/SignoutBtn/signoutBtn";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

type Props = {
  token: string;
};

const Dashboard: NextPage<Props> = () => {
  return (
    <div className={styles.container}>
      <p>hello</p>

      <SignoutBtn />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        statusCode: 302,
      },
    };
  }

  return {
    props: {
      token: "ses",
    },
  };
};

export default Dashboard;
