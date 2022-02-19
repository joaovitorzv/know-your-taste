import { signIn } from "next-auth/react";

type Props = {
  callbackError?: string;
};

const SigninBtn = ({ callbackError }: Props) => {
  return (
    <div>
      {callbackError ? (
        <p>Couldn&apos;t authenticate your spotify account, try again.</p>
      ) : null}
      <button onClick={() => signIn("spotify")}>login with spotify</button>
    </div>
  );
};

export default SigninBtn;
