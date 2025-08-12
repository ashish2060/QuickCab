// lib/socket.js
import { io } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";

export const socket = io(URL, {
  path: "/socket.io", // match server path
  autoConnect: false, // we control when to connect manually
});
