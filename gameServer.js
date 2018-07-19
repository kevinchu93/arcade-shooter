const gameEngine = require('./src/gameEngine.js');
const Player = require('./src/objects/player/index.js');

module.exports = {
  gameState: {
    players: [],
    enemies: [],
    powerUps: [],
    bullets: [],
  },
  init() {
    gameEngine.serverInit();
    gameEngine.serverStart();
  },
  socketInit(io) {
    io.on('connect', (socket) => {
      gameEngine.players.entities[socket.id] = new Player(gameEngine, socket.id);

      this.listenForClientInput(socket);
      this.sendState(io);

      socket.on('disconnect', () => {
        delete gameEngine.players.entities[socket.id];
      });
    });
  },
  listenForClientInput(socket) {
    socket.on('keydown', (data) => {
      gameEngine.players.entities[socket.id].keyMap[data.keyCode] = true;
    });
    socket.on('keyup', (data) => {
      gameEngine.players.entities[socket.id].keyMap[data.keyCode] = false;
    });
  },
  sendState(io) {
    setInterval(() => {
      this.gameState = {
        players: [],
        enemies: [],
        powerUps: [],
        bullets: [],
      };
      gameEngine.players.getState(this);
      gameEngine.enemies.getState(this);
      gameEngine.powerUps.getState(this);
      gameEngine.bullets.getState(this);
      io.emit('update', this.gameState);
    }, 1000 / 60);
  },
};
