import { signIn } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";
import btn from "./signinBtn.module.scss";
import { BsSpotify as SpotifyIcon } from "react-icons/bs";

type Props = {
  params: ParsedUrlQuery;
};

const SigninBtn = ({ params }: Props) => {
  return (
    <div className={btn.signin}>
      {params.callbackError ? (
        <p>Algo deu errado, Não foi possivel conectar sua conta do spotify.</p>
      ) : null}
      <button
        onClick={() =>
          signIn("spotify", {
            callbackUrl: `https://know-your-taste.vercel.app`,
          })
        }
      >
        <SpotifyIcon size={25} />
        Entrar com spotify
      </button>
    </div>
  );
};

export default SigninBtn;
