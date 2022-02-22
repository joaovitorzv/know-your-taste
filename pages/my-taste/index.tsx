import styles from "@/styles/Home.module.css";
import MyPlaylists from "components/MyPlaylists/myPlaylists";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import Header from "../../components/Header/header";
import SignoutBtn from "../../components/SignoutBtn/signoutBtn";
import { AUTH_ERROR } from "../../types/next-auth.d";

type Props = {
  data: any;
};

const MyTaste: NextPage<Props> = () => {
  const session = useSession();
  useEffect(() => {
    if (session.data?.error === AUTH_ERROR.REFRESH_TOKEN)
      signIn("spotify", { callbackUrl: "http://localhost:3000/my-taste" });
  }, [session]);

  return (
    <div className={styles.container}>
      <Header />
      <p>hello</p>
      <SignoutBtn />
      <hr />
      <MyPlaylists />
    </div>
  );
};

export default MyTaste;
