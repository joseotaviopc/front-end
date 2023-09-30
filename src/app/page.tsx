"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";
import { Header } from "@/components/Header";
import { authLogin } from "@/services/api";

export default function Home() {
  const router = useRouter();

  const [showPasssword, setShowPassword] = useState(false);

  function handlePasswordHidden() {
    setShowPassword(!showPasssword);
  }

  const loginValidationSchema = z.object({
    email: z
      .string()
      .nonempty("Campo obrigatório")
      .email("Formato e-mail inválido"),
    password: z
      .string()
      .nonempty("Campo obrigatório")
      .min(6, "Mínimo 6 caracteres"),
  });

  type LoginValidationSchema = z.infer<typeof loginValidationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidationSchema>({
    resolver: zodResolver(loginValidationSchema),
  });

  async function handleUserLogin(data: LoginValidationSchema) {
    const fetchData = await authLogin();
    const users = fetchData.filter((user: any) =>user.email === data.email && user.password === data.password);

    if (!users.length) {
      alert("E-mail ou senha incorretos.");
      return;
    }
    router.push("/feed");
  }

  return (
    <>
      <Header />
      <main className="mt-20 max-w-lg w-full mx-auto px-4">
        <div className="flex flex-col items-center border border-zinc-300 rounded p-8">
          <h2 className="text-2xl font-semibold text-green-color">
            Acessar conta
          </h2>
          <form
            className="mt-5 w-full flex flex-col gap-6"
            onSubmit={handleSubmit(handleUserLogin)}
          >
            <div className="flex flex-col">
              <label className="font-semibold">Nome de usuário/E-mail:</label>
              <input
                type="text"
                className={`font-regular border outline-none rounded border-zinc-500 py-2 px-3 ${
                  errors.email && "login-error"
                }`}
                placeholder="Insira seu nome de usuário ou e-mail"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Senha:</label>
              <div
                className={`border outline-none rounded border-zinc-500 flex items-center justify-between px-3 ${
                  errors.password && "login-error"
                }`}
              >
                <input
                  type={showPasssword ? "text" : "password"}
                  className={`w-full font-regular outline-none py-2 bg-transparent ${
                    errors.password && "placeholder:text-red-500"
                  }`}
                  placeholder="Insira sua senha"
                  {...register("password")}
                />
                <button type="button" onClick={handlePasswordHidden}>
                  {showPasssword ? <PiEyeLight /> : <PiEyeSlashLight />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="bg-green-color rounded w-full p-2 text-white"
            >
              Acessar conta
            </button>
            <button
              type="button"
              className="rounded border border-zinc-500 text-black w-full p-2 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
              disabled
            >
              <FcGoogle size={20} />
              Entrar com o Google
            </button>
          </form>

          <span className="mt-24">
            Ainda não tem uma conta?{" "}
            <Link
              href="/"
              className="text-green-color font-bold hover:underline"
            >
              Criar conta
            </Link>
          </span>
        </div>
      </main>
    </>
  );
}
