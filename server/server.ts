import { WebSocketServer } from "ws";
import { createServer, ServerResponse, RequestOptions } from "http";

const ws = new WebSocketServer({ port: 4000 });

let state = "";

ws.on("connection", (ws) => {
  ws.on("message", (message) => {
    state = message.toString();
    console.log(message.toString());
    ws.send(message.toString());
  });
});

const requestHandler = (_request: RequestOptions, response: ServerResponse) => {
  response.setHeader("Content-Type", "application/json");
  response.writeHead(200);
  response.end(`{"state": "${state}"}`);
}

const http = createServer(requestHandler);

http.listen(8000, () => {
  console.log("listening on port 8000");
});