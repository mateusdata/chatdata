import React, { useContext, useState } from "react";
import { useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { Contexto } from "../../context/Contexto";
import { HashLoader } from "react-spinners";
import axios from "axios";
import HeaderLogin from "../../components/herder login/header";
import { Spin } from "antd";
function LoginForm() {
  const [load, setLoad] = useState(true);
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [fazerLogin, setFazerLogin] = useState(false);
  const [erro, setErro] = useState(".")
  const { login } = useContext(Contexto);
  const [req, setReq] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 1300);
  }, []);

  useEffect(() => {
    const recovereUser = localStorage.getItem("usuario");
    if (recovereUser) {
      navigate("/");
    }
    isLogin();
    // eslint-disable-next-line
  }, [req]);

  const isLogin = () => {
    login(email, req.newName);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fazerLogin) {
      if (nome && email && senha) {
        axios.post("https://chat-data-api.vercel.app/login", {
          nome,
          email,
          senha,
        }).then((response) => {
          console.log(response.data);
          localStorage.setItem("arraySize", "0");
          alert("deu certo")
          setErro(JSON.stringify(response.data.erroStatus));
          if (response.data.erroStatus) {
            setReq(response.data)
            setNome(response.data.name)
          }

        }).catch((error) => {
          console.error(error);
        });
      }
      return;
    }
    axios.post("https://chat-data-api.vercel.app/login", {
      nome,
      email,
      senha,
      fazerLogin
    })
      .then((response) => {
        localStorage.setItem("arraySize", "0");
        setErro(JSON.stringify(response.data.erroStatus));
        console.log(response.data.erroStatus);
        if (response.data.erroStatus) {
          setReq(response.data);
        } else {
          // Se o login for bem-sucedido e a resposta não contiver erroStatus, faça o seguinte:
          // 1. Armazene o tamanho do array em localStorage
          localStorage.setItem("arraySize", "0");
          // 2. Atualize o estado ou faça outras ações necessárias após o login bem-sucedido
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return;
  }

  if (load) {
    return (
      <div className="load">
        <Spin size="large" />

      </div>
    );
  }
  return (
    <body class="dark:bg-slate-900 bg-gray-100 flex h-full items-center py-16">
      <main class="w-full max-w-md mx-auto p-6">
        <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div class="p-4 sm:p-7">
            <div class="text-center">
              <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">
                Entrar
              </h1>
              <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Não tem uma conta ainda?
                <a
                  class="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href="../examples/html/signup.html"
                >
                  Cadastre aqui
                </a>
              </p>
            </div>

            <div class="mt-5">
              <button
                type="button"
                class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <svg
                  class="w-4 h-auto"
                  width="46"
                  height="47"
                  viewBox="0 0 46 47"
                  fill="none"
                >
                  <path
                    d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                    fill="#34A853"
                  />
                  <path
                    d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                    fill="#EB4335"
                  />
                </svg>
                Datachat mensagens instatanias
              </button>

              <div class="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                -
              </div>

              <form onSubmit={handleSubmit}>
                <div class="grid gap-y-4">
                  <div>
                    <label
                      for="email"
                      class="block text-sm mb-2 dark:text-white"
                    >
                      Endereço de email
                    </label>
                    <div class="relative">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        name="email"
                        class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        aria-describedby="email-error"
                      />
                      <div class="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                        <svg
                          class="h-5 w-5 text-red-500"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>
                    <p
                      class="hidden text-xs text-red-600 mt-2"
                      id="email-error"
                    >
                      Please include a valid email address so we can get back to
                      you
                    </p>
                  </div>

                  <div>
                    <div class="flex justify-between items-center">
                      <label
                        for="password"
                        class="block text-sm mb-2 dark:text-white"
                      >
                        Senha
                      </label>
                      <a
                        class="text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        href="../examples/html/recover-account.html"
                      >
                        Esqueceu sua senha
                      </a>
                    </div>
                    <div class="relative">
                      <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        id="password"
                        name="password"
                        class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        aria-describedby="password-error"
                      />
                      <div class="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                        <svg
                          class="h-5 w-5 text-red-500"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>
                    <p
                      class="hidden text-xs text-red-600 mt-2"
                      id="password-error"
                    >
                      8+ characters{" "}
                    </p>
                  </div>

                  <div class="flex items-center">
                    <div class="flex">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      />
                    </div>
                    <div class="ms-3">
                      <label for="remember-me" class="text-sm dark:text-white">
                        Remember me
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={() => {

                    }}
                    type="submit"
                    class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    Entrar
                  </button>
                </div>
                {email} - {senha}
              </form>
            </div>
          </div>
        </div>
      </main>
    </body>
  );
}

export default LoginForm;
