import { useEffect } from "react";

import { socket }
from "../lib/socket";

const useSocket = () => {

  useEffect(() => {

    socket.connect();

    return () => {
      socket.disconnect();
    };

  }, []);
};

export default useSocket;