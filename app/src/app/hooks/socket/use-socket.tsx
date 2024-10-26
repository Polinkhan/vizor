import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../../common/config/config";
import { StatusType } from "../../common/types/types.socket";

interface UseSocketProps {
  type: StatusType;
  dependencies?: any[];
}

const useSocket = ({ type, dependencies = [] }: UseSocketProps) => {
  let socket: Socket<any>;
  const [data, setData] = useState();

  useEffect(() => {
    socket = io(SOCKET_URL, { transports: ["websocket"] });
    socket.emit(type);

    socket.on(type + "_status", (data: any) => {
      setData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, dependencies);

  return { data };
};

export default useSocket;
