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
        <p>
          Não foi possivel conectar com sua conta do spotify, tente novamente.
        </p>
      ) : null}
      <button
        onClick={() =>
          signIn("spotify", {
            callbackUrl: `https://know-your-taste.vercel.app/my-taste`,
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
