import { usePathname } from "next/navigation";
import Logout from "./Logout";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showLogout = pathname === "/search" && <Logout />;

  return (
    <>
      {showLogout}
      {children}
    </>
  );
}
