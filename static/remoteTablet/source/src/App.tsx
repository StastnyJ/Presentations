import React, { useRef, useState } from "react";
import { Grid, IconButton, Slider } from "@material-ui/core";
import ColorPicker from "./components/colorPicker";
import CanvasDraw from "react-canvas-draw";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import ClearIcon from "@material-ui/icons/Clear";
import UndoIcon from "@material-ui/icons/Undo";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Timer from "./components/timer";
import ArrowsPanel from "./components/arrowsPanel";

function hexToRgba(color: string, intensity?: number) {
  if (!color.startsWith("#")) return color;
  const redHex = "0x" + color.substring(1, 3);
  const greenHex = "0x" + color.substring(3, 5);
  const blueHex = "0x" + color.substring(5, 7);
  intensity = intensity === undefined ? 100 : intensity;
  intensity /= 100;
  return `rgba(${parseInt(redHex)},${parseInt(greenHex)},${parseInt(blueHex)},${intensity})`;
}

function App() {
  const [actColor, setActColor] = useState("#000000");
  const [oppacity, setOppacity] = useState(100);
  const [size, setSize] = useState(4);

  const canvas = useRef(null);

  const colors = ["#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff"];
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <ArrowsPanel />
        <Timer />
      </Grid>
      <Grid item xs={8}>
        <CanvasDraw
          ref={canvas}
          canvasWidth="100%"
          canvasHeight="80vh"
          brushColor={hexToRgba(actColor, oppacity)}
          brushRadius={size}
          lazyRadius={0}
        />
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Grid container>
              {colors.map((color) => (
                <Grid item xs={2} key={color}>
                  <ColorPicker color={color} onClick={() => setActColor(color)} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container>
              <Grid item xs={3}>
                <IconButton onClick={() => setActColor("rgba(0,0,0,0)")}>
                  <HowToVoteIcon />
                </IconButton>
              </Grid>
              <Grid item xs={3}>
                <IconButton
                  onClick={() => {
                    if (canvas !== null && canvas.current !== null) {
                      // @ts-ignore
                      canvas.current.clear();
                    }
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </Grid>
              <Grid item xs={3}>
                <IconButton>
                  <UndoIcon
                    onClick={() => {
                      if (canvas !== null && canvas.current !== null) {
                        // @ts-ignore
                        canvas.current.undo();
                      }
                    }}
                  />
                </IconButton>
              </Grid>
              <Grid item xs={3}>
                <IconButton>
                  <Brightness4Icon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <Slider value={oppacity} onChange={(e, val) => setOppacity(val as number)} min={0} max={100} />
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => setSize(size + 1)}>
                  <AddIcon />
                </IconButton>
              </Grid>
              <Grid item xs={2} onClick={() => setSize(Math.max(size - 1, 1))}>
                <IconButton>
                  <RemoveIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
