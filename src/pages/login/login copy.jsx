import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Contexto } from "../../context/Contexto";
import axios from "axios";
import { Spin } from "antd";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  senha: yup.string().min(8).required(),
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const { login } = useContext(Contexto);
  const navigate = useNavigate();

  useEffect(() => {
    const recovereUser = localStorage.getItem("usuario");
    if (recovereUser) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://chat-data-api.vercel.app/login", {
        ...data,
        fazerLogin: true,
        nome:""
      });
      console.log(response.data);
      localStorage.setItem("arraySize", "0");
      alert("Login realizado com sucesso");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Endereço de email</label>
          <input
            {...register("email")}
            type="email"
            id="email"
            name="email"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="senha">Senha</label>
          <input
            {...register("senha")}
            type="password"
            id="senha"
            name="senha"
          />
          {errors.senha && <p>{errors.senha.message}</p>}
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginForm;
