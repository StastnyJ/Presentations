import React, { useEffect, useState } from "react";
import "./App.css";
import MainPage from "./Pages/Main";
import LoadingPage from "./Pages/Loading";
import ErrorPage from "./Pages/Error";
import io from "socket.io-client";

export default function App() {
  const [socket, setSocket] = useState<SocketIOClient.Socket | undefined>(undefined);
  const [status, setStatus] = useState<"waiting" | "connected" | "disconnected">("waiting");

  useEffect(() => {
    const newSock = io();
    newSock.on("connect", () => {
      newSock.emit("role", "client");
      setStatus("connected");
    });
    newSock.on("disconnect", () => {
      setStatus("disconnected");
    });
    setSocket(newSock);
  }, []);

  return (
    <>
      {status === "waiting" || socket === undefined ? (
        <LoadingPage />
      ) : status === "connected" ? (
        <MainPage socket={socket} />
      ) : (
        <ErrorPage />
      )}
    </>
  );
}
