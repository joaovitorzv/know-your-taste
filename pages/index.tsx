import styles from "@/styles/Home.module.css";
import Header from "components/Header/header";
import SigninBtn from "components/SigninBtn/signinBtn";
import type { NextPage } from "next";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  params?: {
    callbackError: string;
  };
  session: Session;
};

const Home: NextPage<Props> = () => {
  const { query: params } = useRouter();
  const session = useSession();

  return (
    <div className={styles.container}>
      <Header />
      <hr />
      <Link href="/my-taste">know my taste</Link>{" "}
      <h1>Something wonderful is coming!</h1>
      {session.status !== "authenticated" && <SigninBtn params={params} />}
    </div>
  );
};

export default Home;
