// lib/SocketContext.js
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [cabRideData, setCabRideData] = useState();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000",
      {
        path: "/socket.io",
      }
    );

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, cabRideData, setCabRideData }}>
      {children}
    </SocketContext.Provider>
  );
};

// Hook to use socket easily
export const useSocket = () => useContext(SocketContext);
