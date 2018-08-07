const express = require('express');
const socketIo = require('socket.io');
const ServerEngine = require('./serverEngine.js');

const app = express();
const server = app.listen(3000);

app.use(express.static('dist'));

const io = socketIo(server);

let serverEngine = null;

io.on('connect', (socket) => {
  // creates new serverEngine if non exist, otherwise adds client to existing serverEngine
  if (serverEngine === null) {
    serverEngine = new ServerEngine();
    serverEngine.init(io, socket);
  } else {
    serverEngine.addClient(socket);
  }
  serverEngine.handleClientInput(socket);
  socket.on('disconnect', () => {
    serverEngine.removeClient(socket);
    // if serverEngine has no clients, stop all setInterval loops and delete serverEngine
    if (serverEngine.clients.length === 0) {
      serverEngine.clearLoopIntervals();
      serverEngine = null;
    }
  });
});

module.exports = server;
