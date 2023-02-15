import Link from "next/link";

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
