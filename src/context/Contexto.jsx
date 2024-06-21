import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Contexto = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [load, setLoad] = useState(true);
  const [emailAddress, setEmailAddress] = useState("");
  const navigate = useNavigate();
  const [showScrow, setShowScrow] = useState(true);

  useEffect(() => {
    const recovereUser = localStorage.getItem("usuario");
    if (recovereUser) {
      setUser(JSON.parse(recovereUser));
    }
    setLoad(false);
  }, []);

  const login = async (email, nome) => {
    let arrayColor = [
      "#d31b1b",
      "#b615d6",
      "#d37e0e",
      "#9af20c",
      "#3d84ff",
      "#610d72",
      "#dd08b6",
      "#0a9127",
      "#6f3792",
      "#ccb80a",
      "#0670a1",
    
    ]
    console.log("sera que pegou:" + email + nome);
    let numberRandomic = Math.floor(Math.random() * (arrayColor.length -1));
   
    let colorUser = arrayColor[numberRandomic];
    const logarUser = {
      email,
      nome,
      colorUser
    };
    if (email && nome  ) {
      localStorage.setItem("usuario", JSON.stringify(logarUser));
    }

    ;
    if (email && nome ) {
      setUser(nome);
      setEmailAddress(email);
      navigate("/");
    }
  };
  const logout = () => {
    navigate("/welcome");
    setUser(null);
    localStorage.removeItem("usuario");
    
  };

  return (
    <Contexto.Provider
      value={{
        autenticado: !!user,
        user,
        setUser,
        login,
        logout,
        load,
        emailAddress,
        showScrow,
        setShowScrow
      }}
    >
      {children}
    </Contexto.Provider>
  );
};
