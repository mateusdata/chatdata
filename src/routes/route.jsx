import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, Contexto } from "../context/Contexto";
import LoginForm from "../pages/login/login";
import Talks from "../pages/talks/talks";
import { HashLoader } from "react-spinners";
import Welcome from "../pages/welcome/welcome";
import { Spin } from "antd";
import SignupForm from "../pages/login/SignupForm";


const Rotas = () => {

  function Private({ children }) {
    const { autenticado, load } = useContext(Contexto);

    if (load) {
      return <div style={{display:"flex", color: "blue", justifyContent:"center",alignItems:"center", height:"100vh" }} className="loading">
       <Spin size="large" />
         </div>
    }
    if (!autenticado) {
      return <Navigate to={"/login  " || "/login"} />
    }
    return children
  }
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Private><Talks /></Private>} />
          <Route exact path="/welcome" element={<Welcome />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/cadastro" element={<SignupForm />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Rotas;
