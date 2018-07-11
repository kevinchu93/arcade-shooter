const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(3000);

app.use(express.static('dist'));

const io = socket(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

