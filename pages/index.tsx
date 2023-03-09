import Link from "next/link";
import { GetServerSidePropsContext } from "next";

import FormUser from "@/components/FormUser";

import { getAuthCookie } from "@/utils/functions";

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
  if (getAuthCookie(ctx)) {
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
