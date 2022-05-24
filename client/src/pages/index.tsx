import { useEffect } from "react";

const Index = () => {

  let ws: WebSocket;

  useEffect(() => {
    ws = new WebSocket("ws://localhost:4000");

    ws.onopen = () => {
      console.log("Connected to server");
      ws.send("Hello Server!");
    };

    ws.onmessage = (event) => {
      console.log(event.data);
    };
  });




  return (

    <h1>React ❤️ Chakra</h1>
  )

}

export default Index
