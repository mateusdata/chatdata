import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Spin } from "antd";
import { Contexto } from "../../context/Contexto";
import { api } from "../../config/api";
import { LoadingOutlined } from "@ant-design/icons";

function SignupForm() {
  const { login } = useContext(Contexto);
  const [loading, setLoading] = useState(false)

  const schema = yup.object().shape({
    nome: yup.string().required("Nome é obrigatório"),
    email: yup.string().required("Email é obrigatório").email("Email inválido"),
    senha: yup.string().required("Senha é obrigatória").min(6, "A senha deve ter pelo menos 6 caracteres"),
  });

  const { register,setError, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [load, setLoad] = useState(true);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const cores = ["red", "blue", "green", "cyan", "orange", "purple", "yellow", "pink"];

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 1300);
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await api.post("/user", {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
      });
      const numeroAleatorio = Math.floor(Math.random() * cores.length);
      localStorage.setItem("arraySize", cores[numeroAleatorio]);
      console.log(response.data);
      await login(response.data.email, response.data.name);
    
      setLoading(false)

    } catch (error) {
      console.error("Erro ao criar conta:", error);
      setErro("Erro ao criar conta. Por favor, tente novamente mais tarde.");
      if (error?.response?.status === 400) {
        setError("email", { message: "Conta já cadastrada" })
      }
      setLoading(false)

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
                Criar Conta
              </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm mb-2 dark:text-white">
                    Nome
                  </label>
                  <div className="relative">
                    <input
                      {...register("nome")}
                      type="text"
                      id="nome"
                      name="nome"
                      className={`border w-full rounded-md p-3 hover:outline-blue-500 h-10 ${errors.nome ? "border-red-500" : ""
                        }`}
                      aria-describedby="nome-error"
                    />
                    {errors.nome && (
                      <p className="text-xs text-red-600 mt-2" id="nome-error">
                        {errors.nome.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm mb-2 dark:text-white">
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
                  <label htmlFor="password" className="block text-sm mb-2 dark:text-white">
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      {...register("senha")}
                      type="password"
                      id="senha"
                      name="senha"
                      className={`border w-full rounded-md p-3 hover:outline-blue-500 h-10 ${errors.senha ? "border-red-500" : ""
                        }`}
                      aria-describedby="senha-error"
                    />
                    {errors.senha && (
                      <p className="text-xs text-red-600 mt-2" id="senha-error">
                        {errors.senha.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
               {loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />} size="default" />
                    :
                    "   Criar Conta"
                  }
                </button>
               

              </div>
            </form>
          </div>
        </div>
      </main>
    </body>
  );
}

export default SignupForm;
