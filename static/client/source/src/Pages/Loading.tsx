import React from "react";
import { CircularProgress, Typography } from "@material-ui/core";

export default function () {
  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <CircularProgress size={window.screen.width < window.screen.height ? "20vw" : "20vh"} style={{ marginTop: "35vh" }} />
      <br />
      <br />
      <Typography>Connecting to the presentation</Typography>
    </div>
  );
}
