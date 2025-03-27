const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chatted-created.netlify.app"]
  },
});

io.on("connection", socket => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", data => {
    socket.join(data);
    console.log(`User  with id: ${socket.id} joined in the room ${data}`);
  });
  socket.on("send_message", data => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log("User is disconnected");
  });
});

server.listen(3001, () => {
  console.log("Server is running");
});
