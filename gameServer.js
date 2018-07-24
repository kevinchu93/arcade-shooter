const GameEngine = require('./src/gameEngine.js');
const Player = require('./src/objects/player/index.js');

module.exports = {
  game: {
    engine: null,
    state: {
      players: {},
      enemies: [],
      powerUps: [],
      bullets: [],
    },
  },
  createGame() {
    this.game.engine = new GameEngine();
  },
  init() {
    this.game.engine.server_init();
    this.game.engine.server_start();
  },
  socketInit(io) {
    io.on('connect', (socket) => {
      this.game.engine.players.entities[socket.id] = new Player(this.game.engine, socket.id);
      this.listenForClientInput(socket);
      this.sendState(io);
      socket.on('disconnect', () => {
        delete this.game.engine.players.entities[socket.id];
      });
    });
  },
  listenForClientInput(socket) {
    socket.on('input', (data) => {
      this.game.engine.players.entities[socket.id].keyMap = data.keyMap;
      this.game.engine.players.entities[socket.id].inputSequence = data.sequence;
    });
  },
  sendState(io) {
    setInterval(() => {
      this.game.state = {
        players: {
          entities: {},
        },
        enemies: {
          entities: [],
        },
        powerUps: {
          entities: [],
        },
        bullets: {
          entities: [],
        },
      };
      this.game.state.players.entities = this.game.engine.players.getState();
      this.game.state.enemies.entities = this.game.engine.enemies.getState();
      this.game.state.powerUps.entities = this.game.engine.powerUps.getState();
      this.game.state.bullets.entities = this.game.engine.bullets.getState();
      io.emit('update', this.game.state);
    }, 1000 / 60);
  },
};
