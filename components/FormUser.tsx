import { useForm } from "react-hook-form";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";

import { UserForm } from "@/utils/types";

export default function FormUser({ methodRequest }: { methodRequest: string }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UserForm>();

  const loginOrSignup = async (data: UserForm) => {
    try {
      const url = `api/${methodRequest}`;
      await axios.post(url, data);

      if (methodRequest === "signup") {
        router.push("/");
      } else if (methodRequest === "login") {
        router.push("/search");
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
    <form onSubmit={handleSubmit(loginOrSignup)}>
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
