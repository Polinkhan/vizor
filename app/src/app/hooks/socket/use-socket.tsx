import { useEffect, useState } from "react";
import { StatusType } from "../../common/types/types.socket";
import { useDataContext } from "../../context/data-context";

interface UseSocketProps {
  payload?: any;
  type: StatusType;
  refreshAt?: number;
  dependencies?: any[];
  disconnectOnsuccess?: boolean;
}

const useSocket = ({ type, disconnectOnsuccess, refreshAt, payload = {}, dependencies = [] }: UseSocketProps) => {
  const { socket } = useDataContext();
  const [data, setData] = useState();

  const emitMessage = () => {
    socket.emit(type, payload);
  };

  useEffect(() => {
    let interval_id: number;

    emitMessage();
    if (refreshAt) {
      interval_id = setInterval(emitMessage, refreshAt);
    }

    socket.on(type + "_response", (data: any) => {
      setData(data);

      if (disconnectOnsuccess) {
        clearInterval(interval_id);
      }
    });

    return () => {
      clearInterval(interval_id);
    };
  }, dependencies);

  return { data } as any;
};
export default useSocket;
