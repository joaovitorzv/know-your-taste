import { signIn } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";

type Props = {
  params: ParsedUrlQuery;
};

const SigninBtn = ({ params }: Props) => {
  return (
    <div>
      {params.callbackError ? (
        <p>Couldn&apos;t authenticate your spotify account, try again.</p>
      ) : null}
      <button
        onClick={() =>
          signIn("spotify", { callbackUrl: "http://localhost:3000/my-taste" })
        }
      >
        login with spotify
      </button>
    </div>
  );
};

export default SigninBtn;
