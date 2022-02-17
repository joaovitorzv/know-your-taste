import { signOut } from "next-auth/react";
import router from "next/router";

const SignoutBtn = () => {
  async function handleSignOut() {
    const data = await signOut({ redirect: false, callbackUrl: "/" });

    router.push(data.url);
  }

  return (
    <div>
      <button onClick={() => handleSignOut()}>logout</button>
    </div>
  );
};

export default SignoutBtn;
