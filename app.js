const express = require('express');
const socket = require('socket.io');
const ServerEngine = require('./serverEngine.js');

const app = express();
const server = app.listen(3000);

app.use(express.static('dist'));

const io = socket(server);

const serverEngine = new ServerEngine();
serverEngine.init(io);
