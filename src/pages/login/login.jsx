import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import HeaderLogin from "../../components/herder login/header";
import { Spin } from "antd";
import { Contexto } from "../../context/Contexto";
import { api } from "../../config/api";


function LoginForm() {
  const { login } = useContext(Contexto);

  const schema = yup.object().shape({
    email: yup.string().required("Email é obrigatório").email("Email inválido"),
    senha: yup.string().required("Senha é obrigatória"),

  });
  const { register, setError, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      senha: ""
    }
  });


  const [load, setLoad] = useState(true);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const recovereUser = localStorage.getItem("usuario");
    if (recovereUser) {
      navigate("/");
    }
    setTimeout(() => {
      setLoad(false);
    }, 1300);
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/login", {
        email: data.email,
        senha: data.senha,
      });
      localStorage.setItem("arraySize", "0");
      console.log(response.data);
      await login(response.data.email, response.data.name);
      localStorage.setItem("arraySize", "0");
      // navigate("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      if (error?.response?.status === 404) {
        setError("email")
        setError("senha", { message: "Conta não encontrada" })
      }
      if (!error?.response) {
        setError("senha", { message: "Sem conexão  com a internet" })
      }
    }
  };

  if (load) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <body className="dark:bg-slate-900 bg-gray-100 flex h-full items-center py-16">
      <main className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white mb-12">
                Entre em sua conta
              </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm mb-2  dark:text-white">
                    Endereço de email
                  </label>
                  <div className="relative">
                    <input
                      {...register("email")}
                      type="email"
                      id="email"
                      name="email"
                      className={`border w-full rounded-md p-3 hover:outline-blue-500 h-10 ${errors.email ? "border-red-500" : ""
                        }`}
                      aria-describedby="email-error"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-2" id="email-error">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="block text-sm mb-2 dark:text-white">
                      Senha
                    </label>
                    <button
                      type="button"
                      className="text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"

                    >
                      Esqueceu sua senha
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      {...register("senha")}
                      type="password"
                      id="password"
                      name="senha"
                      className={`border w-full rounded-md p-3 hover:outline-blue-500 h-10 ${errors.senha ? "border-red-500" : ""
                        }`}
                      aria-describedby="password-error"
                    />
                    {errors.senha && (
                      <p className="text-xs text-red-600 mt-2" id="password-error">
                        {errors.senha.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Entrar
                </button>

                <Link to={"/cadastro"}
                  type="button"
                  className="text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Criar Conta
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </body>
  );
}

export default LoginForm;
