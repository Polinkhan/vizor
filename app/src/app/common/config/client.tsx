import axios from "axios";
import { BASE_URL, SOCKET_URL } from "./config";
import { io } from "socket.io-client";

export const getClient = () => {
  // const token = localStorage.getItem(ACCESS_TOKEN);
  // const headers = { Authorization: `Bearer ${token}`, SECRET_API_KEY: API_KEY };

  const headers = {
    "vezor-api-key": "your_api_secret_key",
    "app-secret": "12345",
  };
  return axios.create({ baseURL: BASE_URL, headers: headers });
};

export const getSocketClient = () => {
  return io(SOCKET_URL, { transports: ["websocket"] });
};
