import SendIcon from "@mui/icons-material/Send";
import { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Axios from "axios";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
//import audio from "../../components/audio/audio1.mp3";
import audio2 from "../../components/audio/audio2.mp3";
import audio3 from "../../components/audio/audio3.mp3";
import images from "../../components/array images/images";
import emogins from "../../components/array emogins/emogin";
import Header from "../../components/header/header";

import AccountMenu from "../../components/barra lateral/barraLateral";
import { Contexto } from "../../context/Contexto";


function Talks() {
  const [mensage, setMensage] = useState("");
  const [arrayTalks, setArrayTalks] = useState([]);
  const [number, setNumber] = useState(0);
  const [changeColor, setChangeColor] = useState(false);
  const [changeemogin, setChangeemogin] = useState(false);
  const [isTrueMensagem, setIstruMensage] = useState(false);
  const { user, setUser } = useContext(Contexto);
  const [mutado, setMutado] = useState(true)

  
  useEffect(() => {
    const recovereUser = localStorage.getItem("usuario");
    if (!("Notification" in window)) {
      console.warn("Notifications not supported in this browser");
      return;
    }
    setUser(JSON.parse(recovereUser));
    let numberEmogin = Math.floor(Math.random() * emogins.arrayEmogins.length);
    setChangeemogin(numberEmogin);

    Axios.get("https://chat-data-api.vercel.app/").then((response) => {
      setArrayTalks(response.data);
    });

    // eslint-disable-next-line
  }, [arrayTalks]);

  const deleteTalks = (id) => {
    Axios.delete(`https://chat-data-api.vercel.app/apagar/${id}`);
  };

  const changeImage = () => {
    let numberRandomic = Math.floor(Math.random() * images.images.length);
    setNumber(numberRandomic);
    if (changeColor) {
      setChangeColor(false);
      return;
    }
    setChangeColor(true);
  };
  const silenciar = ()=>{
    setMutado(false);
    alert(mutado)
   } 

  const deleteAllTalks = () => {
    setArrayTalks("");
    if (arrayTalks.length) {
      Axios.delete("https://chat-data-api.vercel.app/delete").then(
        (response) => {
          new Audio(audio2).play();
          setArrayTalks("");
          alert("Conversas apagadas");
        }
      );
    }
  };
 
  const sendMensage = (e) => {
    e.preventDefault();
    if (mensage) {
      setMensage("");
      const currentTime = new Date();
      let hours = currentTime.getHours().toLocaleString("pt-BR", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      let minutes = currentTime.getMinutes().toLocaleString("pt-BR", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      //let seconds = currentTime.getSeconds().toLocaleString('pt-BR', {minimumIntegerDigits: 2, useGrouping:false});
      const hora = `${hours}:${minutes}`;
      
      Axios.post("https://chat-data-api.vercel.app/send", {
        talk: mensage,
        time: hora,
        phoneUser: user.email,
        currentUser: user.nome,
      });
    }
    if (arrayTalks.length === 0) {
      return <p>Carregando...</p>;
    }
  };

  return (
    <>
      <Header />
      <div
        className="container"
        style={{
          backgroundImage: ` url( ${images.images[number]})`,
        }}
      >
        <header>
          <h1>ChatData</h1>

          <AccountMenu nome={user.nome}  silenciar={silenciar} picture={user.picture}changeImage={changeImage} user={user.nome} />
        </header>

        {
          <Button
            onClick={deleteAllTalks}
            variant="outlined"
            style={{ color: !!arrayTalks.length && "red", border: "none" }}
            startIcon={<DeleteIcon />}
          >
            Apagar conversa
          </Button>
        }
        {/*<CardUser/>*/}
        <div className="mensagemm">
          <div className={arrayTalks.length ? "mesagemON" : "mesagemOF"}>
            {arrayTalks &&
              arrayTalks &&
              arrayTalks.map((item, index) => (
                <div
                  key={item.id}
                  className="englobaP"
                  style={{
                    display: "flex",
                    justifyContent: item.phoneUser === user.email && "flex-end",
                  }}
                >
                  <p
                    onClick={() => {
                      !isTrueMensagem
                        ? setIstruMensage(true)
                        : setIstruMensage(false);
                    }}
                    className="message sent"
                    style={{
                      backgroundColor: item.phoneUser === user.email && "white",
                    }}
                  >
                    <b
                      onClick={() =>
                        alert(
                          "Usuario: " +
                            item.currentUser +
                            "\nemail: " +
                            item.phoneUser
                        )
                      }
                      style={{
                        color: !(user.nome === item.currentUser)
                          ? user.colorUser
                          : "blue",
                      }}
                    >
                      
                      {!(user.nome === item.currentUser)
                        ? item.currentUser
                        : "Eu"}
                    </b>
                   
                    <br />
                    {item.talk}
                    {isTrueMensagem && (
                      <DeleteIcon
                        onClick={() => {
                          deleteTalks(item.id);
                          new Audio(audio3).play();
                        }}
                        style={{ color: "red" }}
                      />
                    )}
                    <span className="status">
                      <CheckIcon
                        style={{
                          padding: "0",
                          margin: "0",

                          fontSize: "1.2rem",
                        }}
                      />
                      <CheckIcon
                        style={{
                          padding: "0",
                          margin: "0",

                          fontSize: "1.2rem",
                          marginLeft: "-8px",
                        }}
                      />
                      <span className="hora">{item.time}</span>
                      
                    </span>
                  </p>
                </div>
              ))}
            {arrayTalks.length === 0 && (
              <div
                id="whatsapp-message"
                style={{
                  display: "flex",
                  gap: "0.2rem",
                  borderRadius: "0.5rem",
                }}
              >
                <p className="fa fa-lock"></p>
                 Olá {user.nome} Seja bem-vindo ao Chat data, converse com seus amigos nesse chat-group.
              </div>
            )}
          </div>
        </div>
        <main>
          <form onSubmit={sendMensage}>
            <textarea
              value={mensage}
              placeholder={`${emogins.arrayEmogins[changeemogin]} Mensagem...`}
              onChange={(e) => {
                setMensage(e.target.value);
              }}
            ></textarea>

            <button onSubmit={sendMensage} type="submit">
              <SendIcon />
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export default Talks;
