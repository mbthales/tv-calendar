"use client";

import { createContext, ReactNode, useEffect } from "react";
import { getCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";
import jwt_decode from "jwt-decode";

type AuthContext = {
  userId: number | null;
};

type Jwt = {
  userId: number;
  exp: number;
  iat: number;
};

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() as string;

  const authToken = getCookie("auth_token") as string | undefined;
  const jwt: Jwt | null = authToken ? jwt_decode(authToken) : null;
  const userId = jwt ? jwt.userId : null;

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
    <AuthContext.Provider value={{ userId }}>{children}</AuthContext.Provider>
  );
}
