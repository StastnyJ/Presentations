import React, { useEffect, useState } from "react";
import LoadingPage from "./Pages/Loading";
import ControllsPage from "./Pages/Controlls";
import QuestionsPage, { Question } from "./Pages/Questions";
import io from "socket.io-client";
import "./App.css";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function App() {
  const [socket, setSocket] = useState<SocketIOClient.Socket | undefined>(undefined);
  const [questionsVisible, setQuestionsVisible] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const soc = io();
    soc.on("connect", () => {
      soc.emit("role", "rc");
    });
    soc.on("questionsInformation", (info: { [index: number]: string }) => {
      setQuestions(
        ((Object.keys(info) as unknown[]) as number[]).map((index) => {
          return { id: index, text: info[index] };
        })
      );
    });
    setSocket(soc);
  }, []);

  return (
    <FullScreen handle={useFullScreenHandle()}>
      {socket === undefined ? (
        <LoadingPage />
      ) : questionsVisible ? (
        <QuestionsPage
          setQuestionsVisible={setQuestionsVisible}
          socket={socket}
          questions={questions}
          setQusetions={setQuestions}
        />
      ) : (
        <ControllsPage setQuestionsVisible={setQuestionsVisible} socket={socket} />
      )}
    </FullScreen>
  );
}

export default App;
