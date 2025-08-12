import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handler(req, res); // manually handle requests
  });

  const io = new Server(httpServer, {
    path: "/socket.io", // default
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.emit("hello", "world");
    socket.on("custom-message", (data) => {
      console.log(data);
      io.emit("cab-drivers", data);
    });

    socket.on("cab-rides", (data) => {
      console.log(data);
      io.emit("cab-drivers", data);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
