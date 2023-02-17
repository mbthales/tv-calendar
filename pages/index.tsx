import Link from "next/link";
import { GetServerSidePropsContext } from "next";

import FormUser from "@/components/FormUser";

export default function Login() {
  return (
    <main>
      <h1>Login</h1>
      <FormUser methodRequest="login" />
      <p>Doesn't have a account?</p>
      <Link href="/signup">Signup</Link>
    </main>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cookie = ctx.req.headers.cookie;
  const authToken = cookie?.split("=")[1];

  if (authToken) {
    return {
      redirect: {
        destination: "/search",
      },
    };
  }

  return {
    props: {},
  };
}
