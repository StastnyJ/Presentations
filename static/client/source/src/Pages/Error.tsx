import React from "react";
import { Alert } from "@material-ui/lab";

export default function () {
  return (
    <div style={{ height: "100%", width: "100%", textAlign: "center" }}>
      <Alert severity="error" style={{ marginTop: "30vh" }}>
        Connection to the presentation lost! Try to refresh the page.
      </Alert>
    </div>
  );
}
