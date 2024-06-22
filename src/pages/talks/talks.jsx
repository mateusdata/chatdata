
import { useContext, useEffect, useState } from "react";

import { Tooltip, Popover } from "antd";

import { Contexto } from "../../context/Contexto";
import GlobalLayout from "../../components/globalLayout.js/globalLayout";
import { useRef } from "react";
import { CopyOutlined } from "@ant-design/icons";
import Skelecto from "../../components/skelecto/skelecto";
import { api } from "../../config/api";
import NotMessage from "../../components/NotMessage";
import { websocket } from "../../config/websocket";
import { OnlinePredictionOutlined } from "@mui/icons-material";

function Talks() {
  const [arrayTalks, setArrayTalks] = useState([]);
  const { user, setUser, showScrow, setShowScrow } = useContext(Contexto);
  const [copy, setCopy] = useState(null);
  const minhaRef = useRef(null);
  const [ws, setWs] = useState(null);
  const [websocketOpen, setWebsocketOpen] = useState(false);
  const [updateTalks, setUpdateTalks] = useState(false);


  useEffect(() => {
    // Função para iniciar a conexão WebSocket
    const startWebSocket = () => {
      const websocketInstance = new WebSocket(websocket);
      setWs(websocketInstance);

      websocketInstance.onopen = () => {
        console.log("Conexão WebSocket aberta.");
        setWebsocketOpen(true);
      };

      websocketInstance.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          setArrayTalks(data)
          console.log(data)

          //{ behavior: 'smooth' }
        } catch (error) {

        }
      };

      websocketInstance.onclose = () => {
        console.log("Conexão WebSocket fechada.");
        setWebsocketOpen(false);
        setUpdateTalks(true)
      };

      websocketInstance.onerror = (error) => {
        console.error("Erro na conexão WebSocket:", error);
      };
    };

    startWebSocket(); // Inicia a conexão WebSocket ao montar o componente

    return () => {
      // Fecha a conexão WebSocket ao desmontar o componente
      if (ws) {
        ws.close();
      }
    };
  }, [updateTalks]);


  useEffect(() => {
    const recovereUser = localStorage.getItem("usuario");
    if (!("Notification" in window)) {

      return;
    }
    setUser(JSON.parse(recovereUser));
    minhaRef?.current?.scrollIntoView({ behavior: 'smooth' });


    // eslint-disable-next-line
  }, [arrayTalks]);

  const deleteTalks = (id) => {
    api.delete(`/apagar/${id}`).then((r) => {
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

    }, 200);
  };

  const stopPress = () => {
    clearTimeout(pressTimer.current);
    setLongPress(false);
  };
  const deleteTalksa = (id) => {
    api.delete(`https://chat-data-api.vercel.app/apagar/${id}`);
  };


  return (
    <GlobalLayout>
      <pre>{false && JSON.stringify(arrayTalks, null, 2)}</pre>

      {true && arrayTalks?.length > 0 ? (
        <div
          onTouchMove={handleScroll}
          onWheel={handleScroll}
          className=" w-full  flex  mb-6"
        >
          <div className="flex flex-col w-[100%]  justify-center items-center  lg:px-52  2xl:px-96">
            {arrayTalks?.map((item, index) => (
              <div
                key={index}
                onMouseDown={() => startPress(index)}
                onMouseUp={stopPress}
                className={`w-[90%] p-0  flex ${user.nome === item.currentUser
                  ? "justify-end"
                  : "justify-start"
                  } p-1  `}
              >
                <div
                  className={`flex min-w-10 max-w-[90%] ${user.nome === item.currentUser
                    ? " bg-[#D9FDD3]"
                    : "j bg-white"
                    } break-words flex-col px-4 py-1 rounded-2xl shadow-md bg-[#E2FEDD] `}
                  style={{ backgroundColor: currentMenssage === index && "#c7fcbd" }}
                >

                  <Popover
                    content={<a className="text-red-600" onClick={() => { { deleteTalks(item.id) } }}>Apagar</a>}

                    open={currentMenssage === index}

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

                        }
                      }}
                    >
                      <Tooltip color="blue" title="Copiado">
                        <CopyOutlined
                          className={`${copy === index ? "text-green-500" : "text-gray-500"
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

      <p>Status da conexão WebSocket: {websocketOpen ? 'Online' : 'Fechada'}</p>
      <OnlinePredictionOutlined style={{ color: websocketOpen ? "green" : "black", }} fontSize="large" className={`${websocketOpen ? "animate-bounce" : "animate-none"}`} />
    </GlobalLayout>
  );
}

export default Talks;
