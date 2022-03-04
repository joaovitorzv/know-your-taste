import ArtistsChart from "components/ArtistsChart/artistsChart";
import Discover from "components/Discover/discover";
import Header from "components/Header/header";
import MyPlaylists from "components/Playlists/myPlaylists";
import TopItems from "components/TopItems/topItems";
import layout from "./layout.module.scss";

const Layout = () => {
  return (
    <div className={layout.container}>
      <Header />
      <main>
        <section className={layout.flex}>
          <ArtistsChart />
          <TopItems />
        </section>
        <section className={layout.flex}>
          <Discover />
          <MyPlaylists />
        </section>
      </main>
      <footer>sla veio</footer>
    </div>
  );
};

export default Layout;
