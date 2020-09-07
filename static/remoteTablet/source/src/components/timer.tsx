import { IconButton, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import RestoreIcon from "@material-ui/icons/Restore";

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${("0" + hours).slice(-2)}:${("0" + mins).slice(-2)}:${("0" + secs).slice(-2)}`;
}

export default function () {
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSecs(secs + 1);
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div style={{ position: "absolute", bottom: "0" }}>
      <Typography style={{ fontSize: "6em", float: "left" }}>{formatTime(secs)}</Typography>
      <IconButton style={{ marginTop: "1em", height: "4em", width: "4em" }} onClick={() => setSecs(0)}>
        <RestoreIcon style={{ height: "2em", width: "2em" }} />
      </IconButton>
    </div>
  );
}
