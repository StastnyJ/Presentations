import React, { useState } from "react";
import { FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Typography } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import DeleteIcon from "@material-ui/icons/Delete";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied"; // TODO better emoji

interface IProps {
  socket: SocketIOClient.Socket;
}

interface Question {
  id: string;
  text: string;
}

function genQuestionId() {
  return Date.now().toString() + Math.floor(Math.random() * 10000);
}

export default function ({ socket }: IProps) {
  const [lastClick, setLastClick] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState("");

  const icons = [
    { icon: FavoriteIcon, text: "❤️", color: "red" },
    { icon: ThumbUpAltIcon, text: "👍", color: "blue" },
    { icon: SentimentSatisfiedIcon, text: "😯", color: "orange" },
    { icon: ThumbDownIcon, text: "👎", color: "blue" },
    { icon: SentimentDissatisfiedIcon, text: "😠", color: "orange" },
  ];

  return (
    <>
      <Grid container direction="column" style={{ height: "100%" }}>
        <Grid item xs={10} style={{ width: "100%", maxWidth: "100%" }}>
          <br />
          <FormControl fullWidth style={{ marginLeft: "2%", marginRight: "2%", width: "96%" }}>
            <InputLabel>Write question</InputLabel>
            <Input
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      const qId = genQuestionId();
                      socket.emit("question", `${qId};${newQuestion}`);
                      setQuestions([...questions, { id: qId, text: newQuestion }]);
                      setNewQuestion("");
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <br />
          <Grid style={{ marginTop: "24px", marginLeft: "2%", width: "96%" }} container>
            {questions.map((q) => (
              <React.Fragment key={q.id}>
                <Grid item xs={11}>
                  <Typography>{q.text}</Typography>
                </Grid>
                <Grid item xs={1}>
                  <IconButton>
                    <DeleteIcon
                      style={{ color: "red" }}
                      onClick={() => {
                        socket.emit("removeQuestion", q.id);
                        setQuestions(questions.filter((ques) => ques.id !== q.id));
                      }}
                    />
                  </IconButton>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={2} style={{ width: "100%", maxWidth: "100%" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={1}>
                  <></>
                </Grid>
                {icons.map((icon) => (
                  <Grid item xs={2} style={{ textAlign: "center", height: "100%" }}>
                    <IconButton
                      onClick={() => {
                        if (Date.now() - lastClick < 10000) return;
                        socket.emit("reaction", icon.text);
                        setLastClick(Date.now());
                      }}
                      style={{ color: icon.color, height: "100%" }}
                    >
                      <icon.icon />
                    </IconButton>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
