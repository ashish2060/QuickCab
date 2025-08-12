"use client";

import { useState } from "react";
import { useSocket } from "@/context/SocketContext";

export default function Home() {
  const { socket } = useSocket();

  const [message, setMessage] = useState();

  const handleButtonClick = () => {
    socket.emit("custom-message", { text: "Hey server!" });
    console.log("clicked");
  };

  if (socket) {
    socket.on("click-response", (data) => setMessage(data));
  }

  return (
    <div>
      <p>Message: {message}</p>
      <button onClick={handleButtonClick}>click</button>
    </div>
  );
}
