import styles from "@/styles/Home.module.css";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Something wonderful is coming!</h1>

      <div>
        <Link href="/api/auth">login with spotify</Link>
      </div>
    </div>
  );
};

export default Home;
