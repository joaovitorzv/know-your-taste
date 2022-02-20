import styles from "@/styles/Home.module.css";
import Header from "components/Header/header";
import SignoutBtn from "components/SignoutBtn/signoutBtn";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, signIn } from "next-auth/react";
import { ERROR } from "../api/auth/[...nextauth]";

type Props = {
  data: any;
};

const MyTaste: NextPage<Props> = ({ data }) => {
  return (
    <div className={styles.container}>
      <Header />
      <p>hello</p>

      <SignoutBtn />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session?.error === ERROR.REFRESH_TOKEN) signIn("spotify");

  const request = await fetch(`${process.env.APP_BASE_URI}/api/my-taste`, {
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

export default MyTaste;
