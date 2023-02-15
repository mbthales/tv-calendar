"use client";

import { useForm } from "react-hook-form";
import axios, { isAxiosError } from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

type LoginData = {
  username: string;
  password: string;
  error: string | null;
};

type ResJsonData = {
  authToken: string;
  msg: string;
  err: string;
};

export default function Login({ methodRequest }: { methodRequest: string }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginData>();

  const login = async (data: LoginData) => {
    const url = `${process.env.NEXT_PUBLIC_DB_BASE_URL}/${methodRequest}`;

    try {
      const res = await axios.post(url, data);
      const { authToken }: ResJsonData = await res.data;

      
      if (methodRequest === "signup") {
        router.push("/");
      } else if (methodRequest === "login") {
        router.push("/search");
        setCookie("auth_token", authToken, { maxAge: 24 * 60 * 60 * 1000 });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const errData: { err: string } = error.response?.data;
        setError("root", {
          message: errData.err,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(login)}>
      <label htmlFor="username">
        Username
        <input
          type="text"
          id="username"
          {...register("username", { required: true })}
        />
        {errors.username && "Username is required"}
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
        />
        {errors.password && "Password is required"}
      </label>
      {errors.root && <p> {errors.root.message}</p>}
      <input type="submit" />
    </form>
  );
}
