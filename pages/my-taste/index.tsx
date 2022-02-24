import styles from "@/styles/Home.module.css";
import Discover from "components/Discover/discover";
import MyPlaylists from "components/Playlists/myPlaylists";
import UserTopItems from "components/UserTopItems/userTopItems";
import { useTopItems } from "hooks/swr/useTopItems";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
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

  const { data } = useTopItems("topArtists");

  return (
    <div className={styles.container}>
      <Header />
      <p>hello</p>
      {!data ? (
        <p>loading genre...</p>
      ) : (
        <h2>
          {session.data?.user?.name} You really like to listen{" "}
          {data?.items[0].genres[0]}
        </h2>
      )}

      <div style={{ display: "flex" }}>
        <UserTopItems type="topArtists" />
        <UserTopItems type="topTracks" />
      </div>
      <SignoutBtn />
      <hr />
      <div style={{ display: "flex" }}>
        <Discover />
        <MyPlaylists />
      </div>
    </div>
  );
};

export default MyTaste;
