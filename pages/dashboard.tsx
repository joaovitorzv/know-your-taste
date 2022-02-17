import styles from "@/styles/Home.module.css";
import SignoutBtn from "components/SignoutBtn/signoutBtn";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, signIn } from "next-auth/react";
import { ERROR } from "./api/auth/[...nextauth]";

type Props = {
  data: any;
};

const Dashboard: NextPage<Props> = ({ data }) => {
  console.log(data);

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
  if (session.error === ERROR.REFRESH_TOKEN) signIn("spotify");

  const request = await fetch(`${process.env.APP_BASE_URI}/api/dashboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: context.req.headers.cookie!,
    },
  });
  const data = await request.json();

  return {
    props: {
      data,
    },
  };
};

export default Dashboard;
