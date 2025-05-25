import { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { getSocketClient } from "../common/config/client";

interface DataContextProps {
  socket: Socket<any, any>;
  fetchSocketClient: (service_name: string, payload: any) => Promise<any>;
}

const DataContext = createContext({} as DataContextProps);

export const useDataContext = () => useContext(DataContext);

const DateContextProvider = ({ children }: any) => {
  const [socket, setSocket] = useState<Socket<any, any>>();

  useEffect(() => {
    const newSocket = getSocketClient();
    setSocket(newSocket);
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  const fetchSocketClient = (service_name: string, payload: any) => {
    if (!socket) {
      return Promise.reject(new Error("Socket is not initialized"));
    }

    return new Promise((resolve, reject) => {
      socket.emit(service_name, payload);

      socket.on(`${service_name}_response`, (response: any) => {
        resolve(response);
      });

      socket.on("connect_error", (error) => {
        reject(error);
      });
    });
  };

  const value: any = { socket, fetchSocketClient };

  return <DataContext.Provider value={value}>{socket ? children : "..."}</DataContext.Provider>;
};

export default DateContextProvider;
