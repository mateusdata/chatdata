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
import { useRef } from "react";


function Talks() {
  const [arrayTalks, setArrayTalks] = useState([]);
  const [number, setNumber] = useState(null);
  const [changeemogin, setChangeemogin] = useState(false);
  const { user, setUser } = useContext(Contexto);
  const ref = useRef();

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
    ref.current?.scrollIntoView();
  }, [])

  const deleteTalks = (id) => {
    Axios.delete(`https://chat-data-api.vercel.app/apagar/${id}`);
  };

  return (
    <GlobalLayout>
      <div className=" w-full  flex ">
        <div className="flex flex-col w-[100%]  justify-center items-center ">
          {arrayTalks? arrayTalks?.map((item, index) => (
            <div className={`w-[90%] p-0  flex ${user.nome === item.currentUser ? "justify-end" : "justify-start"} p-2  `}>

              <div className={`flex min-w-10 max-w-[90%] ${user.nome === item.currentUser ? " bg-[#D9FDD3]" : "j bg-white"} break-words flex-col p-2 rounded-2xl shadow-md bg-[#D9FDD3] `}>
              
                <p className="text-blue-500 p-5">{!(user.nome === item.currentUser) ? item.currentUser : "Voce"}</p>
                <pre className="">{item.talk}</pre>
                <p className="text-gray-1000">{item.time}</p>
                
              </div>

            </div>
          )):
          <div>
            carregando
          </div>
          }
        <div ref={ref} />
        </div>
        
      </div>
    </GlobalLayout>
  );
}

export default Talks;