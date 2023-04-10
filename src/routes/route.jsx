import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, Contexto } from "../context/Contexto";
import LoginForm from "../pages/login/login";
import Talks from "../pages/talks/talks";
import { HashLoader } from "react-spinners";


const Rotas = () => {

  function Private({ children }) {
    const { autenticado, load } = useContext(Contexto);

    if (load) {
      return <div style={{display:"flex", color: "blue", justifyContent:"center",alignItems:"center", height:"100vh" }} className="loading">
          <HashLoader color="#36d7b7"  size={100}/>
         </div>
    }
    if (!autenticado) {
      return <Navigate to={"/login" || "/test"} />
    }
    return children
  }
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Private><Talks /></Private>} />
          <Route exact path="/login" element={<LoginForm />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Rotas;
