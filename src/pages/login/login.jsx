import React, { useContext, useState } from "react";
import { useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { Contexto } from "../../context/Contexto";
import Header from "../../components/header/header";
import { HashLoader } from "react-spinners";
import axios from "axios";
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
    }, 2300);
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
        axios.post("http://localhost:3001/login", {
          nome,
          email,
          senha,
        }).then((response) => {
          console.log(response.data);
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
    axios.post("http://localhost:3001/login", {
      nome,
      email,
      senha,
      fazerLogin
    }).then((response) => {
      setErro(JSON.stringify(response.data.erroStatus));
      console.log(response.data.erroStatus);
      if (response.data.erroStatus) {
        setReq(response.data)
      }

    }).catch((error) => {
      console.error(error);
    });
    return;
  }

  if (load) {
    return (
      <div className="load">
        <HashLoader color="#36d7b7" size={100} />
        <p>Chat - Data</p>
      </div>
    );
  }
  return (
    <div >
      <div className="login-container">
      <Header>
       

      </Header>
        <div className="login">
          <h1>{fazerLogin ? "Inscreva-se no Chatdata" : "Fazer Login  no Chatdata"}</h1>
          <form className="formulario" onSubmit={handleSubmit}>
            {fazerLogin && <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />}
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
            <button type="submit" className="cadastrar">{fazerLogin ? "Cadastrar" : "Entrar"}</button>
            <p onClick={() => {
              setNome("")
              setEmail("")
              setSenha("")
              setFazerLogin(!fazerLogin);
              setErro("")
            }} style={{ color: "blue", fontWeight: "bolder", textDecoration: "underline", cursor: "pointer" }} className="fazerLogin">{fazerLogin ? "Fazer login" : "Inscreve-se"}</p>
          </form>
          <p style={{ color:erro  ? "red" : "green", fontSize: 12, fontFamily:"sans-serif" }}>{erro}</p>

        </div>
      </div>
    </div>
  );
}

export default LoginForm;
