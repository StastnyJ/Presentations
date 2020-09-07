import React from "react";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { IconButton } from "@material-ui/core";

export default function () {
  const iconsStyle = { width: "6em", height: "6em" };
  const btnSizes = { width: "6em", height: "6em" };
  return (
    <>
      <IconButton style={{ position: "absolute", bottom: "18em", left: "6em", ...btnSizes }}>
        <KeyboardArrowUpIcon style={iconsStyle} />
      </IconButton>
      <IconButton style={{ position: "absolute", bottom: "12em", ...btnSizes }}>
        <KeyboardArrowLeftIcon style={iconsStyle} />
      </IconButton>
      <IconButton style={{ position: "absolute", bottom: "12em", left: "12em", ...btnSizes }}>
        <KeyboardArrowRightIcon style={iconsStyle} />
      </IconButton>
      <IconButton style={{ position: "absolute", bottom: "6em", left: "6em", ...btnSizes }}>
        <KeyboardArrowDownIcon style={iconsStyle} />
      </IconButton>
    </>
  );
}
