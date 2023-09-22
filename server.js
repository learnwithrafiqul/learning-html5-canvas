const express = require("express");

const app = express();
app.use(express.static("public"));

require("express-ws")(app);

let connections = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.ws("/", (ws, req) => {
  connections.push(ws);
  ws.on("message", (message) => {
    connections.forEach((c) => c.send(message));
  });
  ws.on("close", () => {
    connections = connections.filter((c) => c !== ws);
  });
});

app.listen(8080, () => console.log("My server is listening on port 8080"));
