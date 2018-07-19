const express = require('express');
const socket = require('socket.io');
const gameServer = require('./gameServer.js');

const app = express();
const server = app.listen(3000);

app.use(express.static('dist'));

const io = socket(server);

gameServer.init();
gameServer.socketInit(io);
