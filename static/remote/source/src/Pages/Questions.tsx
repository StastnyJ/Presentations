import React from "react";

interface IProps {
  socket: SocketIOClient.Socket;
  setQuestionsVisible: (val: boolean) => void;
  questions: Question[];
  setQusetions: (questions: Question[]) => void;
}

export interface Question {
  id: number;
  text: string;
}

export default function ({ socket, setQuestionsVisible, setQusetions, questions }: IProps) {
  return (
    <div className="page">
      <table id="questionsTable">
        {questions.map((q) => (
          <tr
            onClick={() => {
              socket.emit("removeQuestion", q.id);
              setQusetions(questions.filter((ques) => ques.id !== q.id));
            }}
          >
            <td>{q.text}</td>
            <td className="deleteQuestion">X</td>
          </tr>
        ))}
      </table>
      <button
        onClick={() => {
          socket.emit("hideQuestions");
          setQuestionsVisible(false);
        }}
        className="questions"
        id="hideQuestions"
      >
        Hide questions
      </button>
    </div>
  );
}
