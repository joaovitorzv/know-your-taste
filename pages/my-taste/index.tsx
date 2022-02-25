import styles from "@/styles/Home.module.css";
import Discover from "components/Discover/discover";
import MyPlaylists from "components/Playlists/myPlaylists";
import UserTopItems from "components/UserTopItems/userTopItems";
import { useTopItems } from "hooks/swr/useTopItems";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
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

  const [artistsChartData, setArtistsChartData] = useState<
    { name: string; popularity: number }[]
  >([]);

  if (data && artistsChartData.length === 0) {
    data.items.map((artist: any) =>
      setArtistsChartData((prev) => [
        ...prev,
        { name: artist.name, popularity: artist.popularity },
      ])
    );
  }

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
        <BarChart
          layout="vertical"
          width={600}
          height={300}
          data={artistsChartData}
          margin={{ top: 0, right: 0, left: 30, bottom: 0 }}
        >
          <YAxis type="category" dataKey="name" />
          <XAxis type="number" dataKey="popularity" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar barSize={20} dataKey="popularity" fill="#363636" />
        </BarChart>
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
