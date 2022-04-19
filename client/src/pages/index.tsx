import { useCallback } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const Index = () => {
  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket("ws://localhost:4000");

  const handleClick = useCallback(() => {
    sendJsonMessage({
      message: "Hello from the client!"
    });
  }, []);

  if (lastJsonMessage !== null) {
    console.log(lastJsonMessage);
  }

  return (
    <button
      onClick={handleClick}
      disabled={readyState !== ReadyState.OPEN}
    >
      Click Me To Send "Hello"
    </button>
  )

}

export default Index
