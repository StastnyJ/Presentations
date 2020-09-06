import React from "react";
import Timer from "../Components/Timer";

interface IProps {
  socket: SocketIOClient.Socket;
  setQuestionsVisible: (val: boolean) => void;
}

export default function ({ socket, setQuestionsVisible }: IProps) {
  return (
    <div className="page">
      <Timer />
      <span className="arrow" onClick={() => socket.emit("move", "moveUp")} role="img" aria-label="arrow-up">
        ⬆️
      </span>
      <div>
        <span className="arrow" onClick={() => socket.emit("move", "moveLeft")} role="img" aria-label="arrow-up">
          ⬅️
        </span>
        <span className="arrow" onClick={() => socket.emit("move", "moveRight")} role="img" aria-label="arrow-up">
          ➡️
        </span>
      </div>
      <span className="arrow" onClick={() => socket.emit("move", "moveDown")} role="img" aria-label="arrow-up">
        ⬇️
      </span>
      <br />
      <br />
      <button
        onClick={() => {
          socket.emit("showQuestions", "");
          setQuestionsVisible(true);
        }}
        className="questions"
        id="showQuestions"
      >
        Show questions
      </button>
    </div>
  );
}
