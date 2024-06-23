import { createContext, useEffect, useState } from "react";
import { websocket } from "../config/websocket";

export const ContextWebSocket = createContext(null)

export default function WebSocketProvider({ children }) {
    const [ws, setWs] = useState(null);
    const [messages, setMessages] = useState([]);
    const [websocketOpen, setWebsocketOpen] = useState(false);


    useEffect(() => {
        const recoveryMessage = localStorage.getItem("messages");
        if (recoveryMessage) {
            setMessages(JSON.parse(recoveryMessage))
        }
    }, [])

    useEffect(() => {
        console.log('Conexão ');

        const wsClient = new WebSocket(websocket);

        function connectWebSocket() {

            wsClient.onopen = () => {
                setWebsocketOpen(true);
                setWs(wsClient);
            };

            wsClient.onmessage = (event) => {
                const receivedMessage = JSON.parse(event.data);

                // Verifica se receivedMessage é uma lista de mensagens
                if (Array.isArray(receivedMessage)) {
                    setMessages((prevMessages) => {
                        const updatedMessages = [...prevMessages, ...receivedMessage];
                        localStorage.setItem("messages", JSON.stringify(updatedMessages));
                        return updatedMessages;
                    });
                } else {
                    // Caso seja uma única mensagem
                    setMessages((prevMessages) => {
                        const updatedMessages = [...prevMessages, receivedMessage];
                        localStorage.setItem("messages", JSON.stringify(updatedMessages));
                        return updatedMessages;
                    });
                }
            };

            wsClient.onclose = () => {
                console.log('Conexão WebSocket fechada');
                setTimeout(connectWebSocket, 3000);
                setWebsocketOpen(false);
            };
            wsClient.onerror = (error) => {
                console.log("Deu erro");
                setTimeout(connectWebSocket, 3000);
            }
        }
        connectWebSocket()

        return () => {
            if (ws) {
                ws.close();
                setWs(null);
                /*
                colocar esse if resouveu o problema de aparecer mensagem no console do navegador 
                if(ws){WebSocketContext.js:64 WebSocket connection to 'ws://host/' failed:
                */
            }
        };
    }, []);


    const sendMessage = (message) => {
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
                {websocketOpen ? "Online" : "Tentando reconectar..."}
            </span>
            {children}
        </ContextWebSocket.Provider>
    );
}
