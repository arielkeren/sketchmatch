"use client";

import { createContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import Loading from "./Loading";

export const ServerContext = createContext<Socket | null>(null);

type Props = {
  children: React.ReactNode;
};

const ServerContextProvider: React.FC<Props> = ({ children }) => {
  const [server, setServer] = useState<Socket | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const socket = io("ws://localhost:8080");

    socket.on("connect", () => {
      setServer(socket);
      setIsLoading(false);
    });

    return () => {
      if (socket.connected) socket.disconnect();
    };
  }, []);

  if (isLoading) return <Loading />;

  return (
    <ServerContext.Provider value={server}>{children}</ServerContext.Provider>
  );
};

export default ServerContextProvider;
