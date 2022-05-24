import { serve } from "./deps.ts";

type data = {
    client: string
    motor: {
        frequency: number
        duty: number
    }
}

const handleConnection = () =>  {
    console.log("Connected to a client");
}

const handleMessage = (ws: WebSocket, data: string) => {
    const json:data = JSON.parse(data);
    if (json.client == "frontEnd") {
        const response:data = {
            client: "server",
            motor: json.motor
        }
        ws.send(JSON.stringify(response));
    }
}


const handleError = (e : Event | ErrorEvent) => {
    console.log(e instanceof ErrorEvent ? e.message : e.type);
}

const handleClose = () => {
    console.log("Closed connection");
}

const reqHandler = (req: Request) => {
    if (req.headers.get("upgrade") != "websocket") {
        return new Response("Bad Request", { status: 400 });
    }
    const {socket: ws, response} = Deno.upgradeWebSocket(req);
    ws.onopen = () => handleConnection();
    ws.onmessage = (e) => handleMessage(ws, e.data);
    ws.onerror = (e) => handleError(e);
    ws.onclose = () => handleClose();
    return response;
}

const port = parseInt(Deno.env.get("PORT") ?? "8000");
serve(reqHandler, { port });
console.log(`Listening on port ${port}`);
