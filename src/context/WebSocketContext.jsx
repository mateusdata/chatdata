import { createContext, useContext, useEffect, useState } from "react";
import { websocket } from "../config/websocket";
import { OnlinePredictionSharp } from "@mui/icons-material";
import AvatarUser from "../components/AvatarUser";
import { Contexto } from "./Contexto";

export const ContextWebSocket = createContext(null)

export default function WebSocketProvider({ children }) {
    const [ws, setWs] = useState(null);
    const [messages, setMessages] = useState([]);
    const [websocketOpen, setWebsocketOpen] = useState(false);
    const { user } = useContext(Contexto);

    useEffect(() => {
        const recoveryMessage = localStorage.getItem("messages");
        if (recoveryMessage) {
            //  setMessages(JSON.parse(recoveryMessage))
        }
    }, [])


    useEffect(() => {
        function connectWebSocket() {
            const wsClient = new WebSocket(websocket);

            wsClient.onopen = () => {
                setWebsocketOpen(true);
                setWs(wsClient);
            };

            wsClient.onmessage = (event) => {
                const receivedMessage = JSON.parse(event.data);
                if (!messages.length > 5) {
                    //setMessages([])
                    return
                }
                if (Array.isArray(receivedMessage)) {

                    setMessages((prevMessages) => {
                        const updatedMessages = receivedMessage.filter((msg) => {
                            return !prevMessages.some((prevMsg) => prevMsg.id === msg.id);
                        });

                        return [...prevMessages, ...updatedMessages];
                    });
                } else {
                    // Caso seja uma única mensagem
                    setMessages((prevMessages) => {
                        const updatedMessages = [...prevMessages, receivedMessage];
                        // localStorage.setItem("messages", JSON.stringify(updatedMessages));
                        return updatedMessages;
                    });
                }
            };

            wsClient.onclose = () => {
                setTimeout(connectWebSocket, 1);
                setWebsocketOpen(false);
            };
            wsClient.onerror = (error) => {
                setTimeout(connectWebSocket, 1);
            }
        }

        connectWebSocket();

        // Função de limpeza para fechar o WebSocket ao desmontar o componente
        return () => {
            if (ws) {
                ws.close();
                setWs(null); // Limpa o estado do WebSocket ao fechar
            }
        };
    }, []); // Executa apenas uma vez ao montar o componente

    const sendMessage = (message) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
        } else {
        }
    };

    const deleteMessage = (message) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
        } else {
        }
    };


    return (
        <ContextWebSocket.Provider
            value={{
                messages,
                setMessages,
                ws,
                sendMessage
            }}
        >
            {/* Mostra o status da conexão na tela */}
            <div className=" hidden md:block font-extrabold text-xl 2xl::text-md  text-gray-700 fixed top-2 right-4 bottom-0">

                {
                    user?.nome &&
                    <div className="flex gap-2 items-center justify-center">
                        <span>{user?.nome}</span>
                        <AvatarUser name={user?.nome[0]?.toUpperCase()} />
                    </div>
                }
            </div>
            {children}
        </ContextWebSocket.Provider>
    );
}
