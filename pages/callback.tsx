import type { NextPage, GetServerSideProps } from "next";
import Link from "next/link";

import styles from "@/styles/Home.module.css";

type Props = CallbackParams & {};

const Callback: NextPage<CallbackParams> = (props) => {
  return (
    <div className={styles.container}>
      <h1>callback auth</h1>
      <Link href="/">back to home</Link>
      {props.error ? (
        <>
          <p>
            you haven&apos;t authorized the login with your spotify account:
            {props.error}
          </p>
          <hr />
          <p>if you change your mind</p>
          <Link href="/api/auth">login with spotify</Link>
        </>
      ) : (
        <p>Sucessfuly logged in, you will be redirected!</p>
      )}
    </div>
  );
};

type CallbackParams = {
  error?: string;
  code?: string;
  state?: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params: CallbackParams = context.query;

  const res = await fetch(
    `http://localhost:3000/api/auth/state?compare=${params.state}`
  );
  const { valid } = await res.json();

  if (!valid) {
    return {
      props: {
        error: "state_mismatch",
      },
    };
  }

  if (params.error) {
    return {
      props: params,
    };
  }

  const token_response = await fetch(
    `${process.env.APP_BASE_URI}/api/auth?code=${params.code}`,
    {
      method: "POST",
    }
  );

  if (token_response.status !== 200) {
    return {
      props: {
        error: "token_exchange_error",
      },
    };
  }

  const token = await token_response.json();

  return {
    props: params,
  };
};

export default Callback;
