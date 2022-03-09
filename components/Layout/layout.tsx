import ArtistsChart from "components/ArtistsChart/artistsChart";
import Discover from "components/Discover/discover";
import Header from "components/Header/header";
import MyPlaylists from "components/Playlists/myPlaylists";
import TopItems from "components/TopItems/topItems";
import Footer from "components/Footer/footer";
import layout from "./layout.module.scss";
import { SkeletonTheme } from "react-loading-skeleton";

const Layout = () => {
  return (
    <SkeletonTheme
      baseColor="var(--secondary-light)"
      highlightColor="var(--secondary-semilight)"
      duration={2}
    >
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
        <Footer />
      </div>
    </SkeletonTheme>
  );
};

export default Layout;
