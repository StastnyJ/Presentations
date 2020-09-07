import React from "react";
import "./colorPicker.css";

interface IProps {
  color: string;
  onClick: () => void;
}

export default function ({ color, onClick }: IProps) {
  return (
    <div
      className="square"
      style={{
        backgroundColor: color,
      }}
      onClick={onClick}
    ></div>
  );
}
