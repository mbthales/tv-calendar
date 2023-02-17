import FormUser from "@/components/FormUser";

import { GetServerSidePropsContext } from "next";

export default function Signup() {
  return (
    <main>
      <h1>Signup</h1>
      <FormUser methodRequest="signup" />
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
