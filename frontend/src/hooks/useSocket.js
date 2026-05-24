import { useEffect } from "react";

import { socket } from "../lib/socket";

const useSocket = () => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("SOCKET CONNECTED:", socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, []);
};

export default useSocket;
