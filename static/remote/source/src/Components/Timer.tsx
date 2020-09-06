import React, { useEffect, useState } from "react";

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
    <div id="timePanel" onClick={() => setSecs(0)}>
      {formatTime(secs)}
    </div>
  );
}
