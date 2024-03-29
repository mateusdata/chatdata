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
import { Tooltip, Button, Popover, Input } from "antd";

import AccountMenu from "../../components/barra lateral/barraLateral";
import { Contexto } from "../../context/Contexto";
import { Popconfirm } from "antd";
import GlobalLayout from "../../components/globalLayout.js/globalLayout";
import { useRef } from "react";
import { CopyOutlined } from "@ant-design/icons";
import Skelecto from "../../components/skelecto/skelecto";

function Talks() {
  const [arrayTalks, setArrayTalks] = useState([]);
  const [number, setNumber] = useState(null);
  const [changeemogin, setChangeemogin] = useState(false);
  const { user, setUser, showScrow, setShowScrow } = useContext(Contexto);

  const [copy, setCopy] = useState(null);
  const ref = useRef();
  const minhaRef = useRef(null);

  useEffect(() => {
    const recovereUser = localStorage.getItem("usuario");
    if (!("Notification" in window)) {
      console.warn("Notifications not supported in this browser");
      return;
    }
    setUser(JSON.parse(recovereUser));

    Axios.get("https://chat-data-api.vercel.app/").then((response) => {
      setArrayTalks(response.data);
      if (showScrow) {
        minhaRef.current.scrollIntoView();
        //{ behavior: 'smooth' }
      }
    }).catch((err)=>console.log(""));
    // eslint-disable-next-line
  }, [arrayTalks]);

  const deleteTalks = (id) => {
    Axios.delete(`https://chat-data-api.vercel.app/apagar/${id}`).then((r)=>{
    //console.log(r.data)
    setCurrentMensage("")
    });
  };

  function isUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }
  const timerRef = useRef(null);

  const handleScroll = () => {
    setCurrentMensage("")
    setShowScrow(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setShowScrow(true);
    }, 100000);
  };

  const [longPress, setLongPress] = useState(false);
  const pressTimer = useRef();
  const [currentMenssage, setCurrentMensage] = useState('');

  const startPress = (value) => {
   
    pressTimer.current = window.setTimeout(() => {
      setLongPress(true);
      setCurrentMensage(value)
     // alert("Pressionamento longo detectado!=> index : " + value);
    }, 200);
  };

  const stopPress = () => {
    clearTimeout(pressTimer.current);
    setLongPress(false);
  };
  const deleteTalksa = (id) => {
    Axios.delete(`https://chat-data-api.vercel.app/apagar/${id}`);
  };


  return (
    <GlobalLayout>
      {arrayTalks.length > 0 ? (
        <div
          onTouchMove={handleScroll}
          onWheel={handleScroll}
          className=" w-full  flex  mb-6"
        >
          <div className="flex flex-col w-[100%]  justify-center items-center ">
            {arrayTalks?.map((item, index) => (
              <div
              onMouseDown={()=>startPress(index)} 
              onMouseUp={stopPress}
                className={`w-[90%] p-0  flex ${
                  user.nome === item.currentUser
                    ? "justify-end"
                    : "justify-start"
                } p-1  `}
              >
                <div
                  className={`flex min-w-10 max-w-[90%] ${
                    user.nome === item.currentUser
                      ? " bg-[#D9FDD3]"
                      : "j bg-white"
                  } break-words flex-col px-4 py-1 rounded-2xl shadow-md bg-[#E2FEDD] `}
                  style={{backgroundColor:currentMenssage===index && "#c7fcbd"}}
                >
             
                  <Popover
                    content={<a className="text-red-600" onClick={()=>{{deleteTalks(item.id)}}}>Apagar</a>}
                    
                    open={currentMenssage===index }
                  
                  >
                 
                  </Popover>

                  <div className="flex w-full justify-between items-end gap-2">
                    <p className="text-blue-500 p-0">
                      {!(user.nome === item.currentUser)
                        ? item.currentUser
                        : "Voce"}
                    </p>

                    <button
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(item.talk);
                          setCopy(index);
                          setTimeout(() => {
                            setCopy(null);
                          }, 2000);
                          //alert('Texto copiado!');
                        } catch (err) {
                          alert("Falha ao copiar o texto");
                        }
                      }}
                    >
                      <Tooltip color="blue" title="Copiado">
                        <CopyOutlined
                          className={`${
                            copy === index ? "text-green-500" : "text-gray-500"
                          }`}
                        />
                      </Tooltip>
                    </button>
                  </div>
                  <div>
                    {isUrl(item.talk) ? (
                      <a
                        className="text-blue-600"
                        href={item.talk}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.talk}
                      </a>
                    ) : (
                      <pre className="whitespace-pre-wrap">{item.talk}</pre>
                    )}
                  </div>
                  <div className="flex w-full justify-end items-end">
                    <p className="text-gray-1000">{item.time}</p>
                  </div>
                </div>
              </div>
            ))}

            <div ref={minhaRef} />
          </div>
        </div>
      ) : (
        <Skelecto loading={true} />
      )}
    </GlobalLayout>
  );
}

export default Talks;
