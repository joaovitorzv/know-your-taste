import styles from "@/styles/Home.module.css";
import MyPlaylists from "components/Playlists/myPlaylists";
import UserTopItems from "components/UserTopItems/userTopItems";
import { useTopGenre } from "hooks/swr/useTopGenre";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import useSWR from "swr";
import Header from "../../components/Header/header";
import SignoutBtn from "../../components/SignoutBtn/signoutBtn";
import { AUTH_ERROR } from "../../types/next-auth.d";

interface Props {
  data: any;
}

const MyTaste: NextPage<Props> = () => {
  const session = useSession();
  useEffect(() => {
    if (session.data?.error === AUTH_ERROR.REFRESH_TOKEN)
      signIn("spotify", { callbackUrl: "http://localhost:3000/my-taste" });
  }, [session]);

  const { data, isLoading } = useTopGenre();
  console.log(data);

  return (
    <div className={styles.container}>
      <Header />
      <p>hello</p>
      {isLoading ? (
        <p>loading genre...</p>
      ) : (
        <h2>
          {session.data?.user?.name} You really like to listen{" "}
          {data?.topGenre[0]}
        </h2>
      )}
      <UserTopItems type="artists" />
      <UserTopItems type="tracks" />
      <SignoutBtn />
      <hr />
      <MyPlaylists />
    </div>
  );
};

export default MyTaste;
