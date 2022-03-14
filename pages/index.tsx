import Button from "components/Button";
import Footer from "components/Footer/footer";
import Header from "components/Header/header";
import SigninBtn from "components/SigninBtn/signinBtn";
import type { NextPage } from "next";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import home from "./index.module.scss";

type Props = {
  params?: {
    callbackError: string;
  };
  session: Session;
};

const Home: NextPage<Props> = () => {
  const { query: params, push } = useRouter();
  const user = useSession();
  return (
    <>
      <Head>
        <title>Know Your Taste</title>
        <meta name="title" content="Know Your Taste" />
        <meta
          name="description"
          content="Descubra seu top artistas favoritos."
        />
      </Head>
      <div className={home.container}>
        <Header className={home.header} />
        <main className={home.presentation}>
          <section className={home.features}>
            <h2>
              Descubra seu top <br />
              artistas favoritos.
            </h2>
          </section>
          <section className={home.authenticate}>
            {user.status !== "authenticated" ? (
              <SigninBtn params={params} />
            ) : (
              <Button onClick={() => push("/my-taste")}>Vamos lá</Button>
            )}
          </section>
        </main>
        <Footer className={home.footer} />
      </div>
    </>
  );
};

export default Home;
