import SendIcon from "@mui/icons-material/Send";
import { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
//import audio from "../../components/audio/audio1.mp3";
//import audio2 from "../../components/audio/audio2.mp3";
import audio3 from "../../components/audio/audio3.mp3";
import images from "../../components/array images/images";
import emogins from "../../components/array emogins/emogin";
import Header from "../../components/header/header";
import { Tooltip, Button, Popover, Input } from 'antd';

import AccountMenu from "../../components/barra lateral/barraLateral";
import { Contexto } from "../../context/Contexto";
import { Popconfirm } from "antd";
import GlobalLayout from "../../components/globalLayout.js/globalLayout";


function Talks() {
  const [mensage, setMensage] = useState("");
  const [arrayTalks, setArrayTalks] = useState([]);
  const [number, setNumber] = useState(null);
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


  useEffect(() => {

    let numberRandomic = Math.floor(Math.random() * images.images.length);
    setNumber(numberRandomic)

  }, [])

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
  const silenciar = () => {
    setMutado(false);
    alert(mutado)
  }

  const deleteAllTalks = () => {
    /*
    // setArrayTalks("");
     if (arrayTalks.length) {
       //Axios.delete("https://chat-data-api.vercel.app/delete").then(
         (response) => {
           new Audio(audio2).play();
           setArrayTalks("");
           alert("Conversas apagadas");
         }
       );
     }
    */
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
    <GlobalLayout>
      <div className=" w-full  flex ">
        <div className="flex flex-col w-[100%]  justify-center items-center ">
          {arrayTalks?.map((item, index) => (
            <div className={`w-[80%] p-0  flex ${user.nome === item.currentUser ? "justify-end" : "justify-start"} p-2  `}>

              <div className={`flex min-w-10 max-w-[80%] ${user.nome === item.currentUser ? " bg-[#D9FDD3]" : "j bg-white"} break-words flex-col p-2 rounded-2xl shadow-md bg-[#D9FDD3] `}>
                <p className="text-blue-500">{!(user.nome === item.currentUser) ? item.currentUser : "Voce"}</p>
                <pre>{item.talk}</pre>

                <p className="text-gray-1000">{item.time}</p>
              </div>

            </div>
          ))}

        </div>
        
      </div>
    </GlobalLayout>
  );
}

export default Talks;