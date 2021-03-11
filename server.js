const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


io.on('connection', (socket) => {

  console.log('connecté')
  socket.on('change-room', (roomId) => {
    socket.join(roomId);
    console.log('basculé sur room n°'+roomId)
  });

  socket.on('send-message', (data) => {
    console.log(data);
    io.in(data.roomId).emit('display-message', data);
  });
});




server.listen(3001, () => console.log(`server is running`));