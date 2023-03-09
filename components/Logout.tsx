import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const logout = () => {
    deleteCookie("auth_token");
    router.push("/");
  };

  return <button onClick={() => logout()}>Logout</button>;
}
