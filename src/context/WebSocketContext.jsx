import { createContext, useEffect, useState } from "react";
import { websocket } from "../config/websocket";
import { OnlinePredictionSharp } from "@mui/icons-material";

export const ContextWebSocket = createContext(null)

export default function WebSocketProvider({ children }) {
    const [ws, setWs] = useState(null);
    const [messages, setMessages] = useState([]);
    const [websocketOpen, setWebsocketOpen] = useState(false);


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
            <span className={`${websocketOpen ? "text-green-400 animate-pulse" : "text-red-600"} font-extrabold text-3xl fixed top-0 right-4 bottom-0`}>

                {websocketOpen ? "Online " : "Tentando reconectar..."}
                <OnlinePredictionSharp focusable />

            </span>
            {children}
        </ContextWebSocket.Provider>
    );
}
