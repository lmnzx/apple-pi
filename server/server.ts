import { WebSocketServer } from "ws";
import { createServer, ServerResponse, RequestOptions } from "http";

const ws = new WebSocketServer({ port: 4000 });

type motorData = {
  frequency: number;
  dutyCycle: number;
}

let state: motorData = {
  frequency: 400,
  dutyCycle: 0
};

ws.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log(JSON.parse(message.toString()));
    state = JSON.parse(message.toString());
    ws.send(message.toString());
  });
});

const requestHandler = (_request: RequestOptions, response: ServerResponse) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader("Content-Type", "application/json");
  response.writeHead(200);
  response.end(JSON.stringify(state));
}

const http = createServer(requestHandler);

http.listen(8000, () => {
  console.log("listening on port 8000");
});