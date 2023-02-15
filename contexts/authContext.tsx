"use client";

import { createContext, ReactNode, useEffect } from "react";
import { getCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";

type AuthContext = {
  isAuthenticated: boolean
};

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() as string;

  const authToken = getCookie("auth_token") as string;
  const isAuthenticated = !!authToken;

  const authRoutes = ["/search"];

  const checkAuthenticatedUserInAuthRoute =
    isAuthenticated && authRoutes.includes(pathname);
  const checkAuthenticatedUserInNoAuthRoute =
    isAuthenticated && !authRoutes.includes(pathname);
  const checkNoAuthenticatedUserInNoAuthRoute =
    !isAuthenticated && !authRoutes.includes(pathname);

  useEffect(() => {
    if (
      checkAuthenticatedUserInAuthRoute ||
      checkNoAuthenticatedUserInNoAuthRoute
    ) {
      router.push(pathname);
    } else if (checkAuthenticatedUserInNoAuthRoute) {
      router.push("/search");
    } else {
      router.push("/");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
