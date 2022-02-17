import styles from "@/styles/Home.module.css";
import type { GetServerSideProps, NextPage } from "next";
import { signIn } from "next-auth/react";

const Error: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Authentication failed</h1>

      <div>
        <button onClick={() => signIn("spotify")}>try again</button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Error;
