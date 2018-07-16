const express = require('express');
const socket = require('socket.io');
const gameEngine = require('./src/gameEngine.js');

const app = express();
const server = app.listen(3000);

app.use(express.static('dist'));

const io = socket(server);

gameEngine.serverInit();
gameEngine.serverStart();

io.on('connection', (socket) => {
  socket.on('keydown', (data) => {
    gameEngine.keyMap[data.keyCode] = true;
  });
  socket.on('keyup', (data) => {
    gameEngine.keyMap[data.keyCode] = false;
  });

  setInterval(() => {
    const gameState = {
      player: {},
      enemies: [],
      powerUps: [],
      bullets: [],
    };
    gameState.player = {
      positionX: gameEngine.player.positionX,
      positionY: gameEngine.player.positionY,
    };
    for (let i = gameEngine.enemies.head; i != null; i = i.nextEnemy) {
      gameState.enemies.push({
        positionX: i.positionX,
        positionY: i.positionY,
      });
    }
    for (let i = gameEngine.powerUps.head; i != null; i = i.nextPowerUp) {
      gameState.powerUps.push({
        positionX: i.positionX,
        positionY: i.positionY,
        color: i.color,
      });
    }
    for (let i = gameEngine.bullets.head; i != null; i = i.nextBullet) {
      gameState.bullets.push({
        positionX: i.positionx,
        positionY: i.positionY,
      });
    }
    io.emit('update', gameState);
  }, 1000/60);
});
