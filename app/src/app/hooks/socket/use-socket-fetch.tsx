import { useEffect, useState } from "react";
import { StatusType } from "../../common/types/types.socket";
import { getSocketClient } from "../../common/config/client";

interface UseSocketProps {
  payload?: any;
  type: StatusType;
  dependencies?: any[];
}

const useSocketFetch = ({ type, payload = {}, dependencies = [] }: UseSocketProps) => {
  const [data, setData] = useState();

  useEffect(() => {
    const socket = getSocketClient();
    socket.emit(type, payload);
    socket.on(type + "_response", (data: any) => {
      setData(data);
      socket.disconnect();
    });

    return () => {};
  }, dependencies);

  return { data } as any;
};
export default useSocketFetch;
