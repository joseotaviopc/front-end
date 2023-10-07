"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";
import { api } from "@/services/api";
import { Header } from "@/components/Header";

export default function Cadastro() {
  const router = useRouter();

  const [showPasssword, setShowPassword] = useState({
    password: false,
    consfirmPassword: false,
  });

  const registerValidationSchema = z
    .object({
      name: z.string().min(1, "Campo obrigatório"),
      email: z
        .string()
        .min(1, "Campo obrigatório")
        .email("Formato e-mail inválido"),
      password: z
        .string()
        .min(1, "Campo obrigatório")
        .min(6, "Mínimo 6 caracteres"),
      confirmPassword: z
        .string()
        .min(1, "Campo obrigatório")
        .min(6, "Mínimo 6 caracteres"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas devem ser iguais",
      path: ["confirmPassword"],
    });

  type RegisterValidationSchema = z.infer<typeof registerValidationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValidationSchema>({
    resolver: zodResolver(registerValidationSchema),
  });

  async function userRegister(data: RegisterValidationSchema) {
    const fetchData = await api.registerUser(data);
    console.log(fetchData);

    if (fetchData.status === "success") {
      toast.success("Usuário cadastrado com sucesso.");
      router.push("/");
      return;
    }
    toast.error(fetchData.message);
  }

  return (
    <>
      <Header />
      <main className="mt-20 max-w-lg w-full mx-auto px-4">
        <div className="flex flex-col items-center border border-zinc-300 rounded p-8">
          <h2 className="text-2xl font-semibold text-green-color">
            Criar nova conta
          </h2>
          <form
            className="mt-5 w-full flex flex-col gap-6"
            onSubmit={handleSubmit(userRegister)}
          >
            <div className="flex flex-col">
              <label className="font-semibold">Nome completo:</label>
              <input
                type="text"
                className={`font-regular border outline-none rounded border-zinc-500 py-2 px-3 ${
                  errors.name && "login-error"
                }`}
                placeholder="Insira seu nome completo"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">E-mail:</label>
              <input
                type="text"
                className={`font-regular border outline-none rounded border-zinc-500 py-2 px-3 ${
                  errors.email && "login-error"
                }`}
                placeholder="Ex: meu_email1234@exemplo.com"
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
                  type={showPasssword.password ? "text" : "password"}
                  className={`w-full font-regular outline-none py-2 bg-transparent ${
                    errors.password && "placeholder:text-red-500"
                  }`}
                  placeholder="Insira sua senha"
                  {...register("password")}
                />
                <button
                  data-testid="toogleEye"
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => {
                      return { ...prev, password: !prev.password };
                    })
                  }
                >
                  {showPasssword.password ? (
                    <PiEyeLight />
                  ) : (
                    <PiEyeSlashLight />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Confirmar senha:</label>
              <div
                className={`border outline-none rounded border-zinc-500 flex items-center justify-between px-3 ${
                  errors.confirmPassword && "login-error"
                }`}
              >
                <input
                  type={showPasssword.consfirmPassword ? "text" : "password"}
                  className={`w-full font-regular outline-none py-2 bg-transparent ${
                    errors.confirmPassword && "placeholder:text-red-500"
                  }`}
                  placeholder="Confirme sua senha"
                  {...register("confirmPassword")}
                />
                <button
                  data-testid="toogleEye"
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => {
                      return {
                        ...prev,
                        consfirmPassword: !prev.consfirmPassword,
                      };
                    })
                  }
                >
                  {showPasssword.consfirmPassword ? (
                    <PiEyeLight />
                  ) : (
                    <PiEyeSlashLight />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="bg-green-color rounded w-full p-2 text-white"
            >
              Criar conta
            </button>
            <button
              type="button"
              className="rounded border border-zinc-500 text-black w-full p-2 flex items-center justify-center gap-2"
            >
              <FcGoogle size={20} />
              Entrar com o Google
            </button>
          </form>

          <span className="mt-24">
            Já tem uma conta?{" "}
            <Link
              href="/"
              className="text-green-color font-bold hover:underline"
            >
              Acessar conta
            </Link>
          </span>
        </div>
      </main>
    </>
  );
}
