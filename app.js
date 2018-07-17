const express = require('express');
const socket = require('socket.io');
const gameEngine = require('./src/gameEngine.js');
const Player = require('./src/objects/player/index.js');

const app = express();
const server = app.listen(3000);

app.use(express.static('dist'));

const io = socket(server);

gameEngine.serverInit();
gameEngine.serverStart();

io.on('connect', (socket) => {
  console.log(socket.id);
  socket.on('keydown', (data) => {
    
    if (gameEngine.player.socketId == socket.id) {
      gameEngine.player.keyMap[data.keyCode] = true;
    } else if (gameEngine.player2.socketId == socket.id) {
      gameEngine.player2.keyMap[data.keyCode] = true;
    }
  });
  socket.on('keyup', (data) => {
    if (gameEngine.player.socketId == socket.id) {
      gameEngine.player.keyMap[data.keyCode] = false;
    } else if (gameEngine.player2.socketId == socket.id) {
      gameEngine.player2.keyMap[data.keyCode] = false;
    }
  });

  if (gameEngine.player === null) {
    gameEngine.player = new Player(gameEngine);
    gameEngine.player.socketId = socket.id;
  } else if (gameEngine.player2 === null) {
    gameEngine.player2 = new Player(gameEngine);
    gameEngine.player2.socketId = socket.id;
  }


  setInterval(() => {
    const gameState = {
      player: {},
      player2: {},
      enemies: [],
      powerUps: [],
      bullets: [],
    };
    if (gameEngine.player !== null) {
      gameState.player = {
        positionX: gameEngine.player.positionX,
        positionY: gameEngine.player.positionY,
        bulletType: gameEngine.player.bulletType,
      };
    }
    if (gameEngine.player2 !== null) {
      gameState.player2 = {
        positionX: gameEngine.player2.positionX,
        positionY: gameEngine.player2.positionY,
        bulletType: gameEngine.player2.bulletType,
      };
    }
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
      if (i.type != 'mediumpurple') {
        gameState.bullets.push({
          positionX: i.positionX,
          positionY: i.positionY,
          width: i.width,
          height: i.height,
          type: i.type,
        });
      } else {
        gameState.bullets.push({
          positionX: i.positionX,
          positionY: i.positionY,
          enemyPositionX: i.enemyPositionX,
          enemyPositionY: i.enemyPositionY,
          controlPositionX: i.controlPositionX,
          controlPositionY: i.controlPositionY,
          type: i.type,
        });
      }
    }
    io.emit('update', gameState);
  }, 1000/60);

  socket.on('disconnect', () => {
    if (gameEngine.player.socketId == socket.id) {
      gameEngine.player = null;
    } else if (gameEngine.player2.socketId == socket.id) {
      gameEngine.player2 = null;
    }
  });
});
