const express = require("express");
const app = express();
const http = require("http").Server(app);

app.use(express.static("static"));

let PORT = process.env.PORT || 9000;
let clientsNum = 0;

app.get("/", function (req, res) {
  res.redirect("/presentations/");
});

app.get("/reset", function (req, res) {
  clientsNum = 0;
  res.redirect("/presentations/");
});

process.argv.forEach((val, index) => {
  if (val.startsWith("--port=")) PORT = parseInt(val.split("=")[1]);
});

http.listen(PORT, function () {
  let host = http.address().address;
  let port = http.address().port;

  console.log("listening at http://%s:%s", host, port);
});
