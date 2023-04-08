import React, { useContext, useState } from "react";
import { useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { Contexto } from "../../context/Contexto";
import Header from "../../components/header/header";
import { PuffLoader } from "react-spinners";
function LoginForm() {
  const [load, setLoad] = useState(true);
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const { login } = useContext(Contexto);

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
   
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(nome.length > 0 && email && senha){
      login(email, nome)
    }
  };

  if (load) {
    return (
      <div className="load">
        <PuffLoader size={150} color="#0d9ba5" />
      </div>
    );
  }
  return (
    <div >
      <Header>
        <h1 style={{ color: "black" }}> Chatdata Mensegger</h1>
      </Header>
      <div className="login-container">
        <div className="login">
          <h1>Inscreva-se no Chatdata</h1>

          <form className="formulario">
            <input   type="text" placeholder="Nome" value={nome} onChange={(e)=> setNome(e.target.value)} />
            <input   type="email" placeholder="E-mail" value={email}  onChange={(e)=> setEmail(e.target.value)} />
            <input   type="password" placeholder="Senha" value={senha}  onChange={(e)=> setSenha(e.target.value)} />
            <button onClick={handleSubmit} className="cadastrar">Cadastrar</button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default LoginForm;
