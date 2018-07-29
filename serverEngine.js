const GameEngine = require('./src/gameEngine.js');
const Player = require('./src/objects/player/index.js');

module.exports = class extends GameEngine {
  constructor() {
    super();
    this.clients = [];
    this.latency = 45;
    this.updateLoopsRunning = false;
    this.canvas = {};
    this.fps = 60;
  }
  init(io) {
    super.init();
    this.initSocket(io);
  }
  initSocket(io) {
    io.on('connect', (socket) => {
      this.addClient(socket);
      this.handleClientInput(socket);
      if (this.updateLoopsRunning === false) {
        this.startPhysicsUpdateLoop();
        this.startClientStateUpdateLoop(io, socket);
        this.updateLoopsRunning = true;
      }
      socket.on('disconnect', () => {
        this.removeClient(socket);
      });
    });
  }
  handleClientInput(socket) {
    socket.on('input', (data) => {
      const client = this.clients.find(obj => obj.id === socket.id);
      client.input = JSON.parse(JSON.stringify(data));
    });
  }
  startPhysicsUpdateLoop() {
    setInterval(() => {
      this.timer.tick();
      this.update(this.timer.deltaTime);
      super.spawn();
    }, 1000 / this.fps);
  }
  update(time) {
    this.enemies.update(time);
    this.bullets.update(time);
    this.powerUps.update(time);
    this.players.updateServer(this.clients, time);
  }
  startClientStateUpdateLoop(io) {
    setInterval(() => {
      const state = {
        players: { entities: {} },
        enemies: { entities: [] },
        powerUps: { entities: [] },
        bullets: { entities: [] },
        clients: [],
      };
      state.players.entities = this.players.getState();
      state.enemies.entities = this.enemies.getState();
      state.powerUps.entities = this.powerUps.getState();
      state.bullets.entities = this.bullets.getState();
      state.clients = JSON.parse(JSON.stringify(this.clients));
      setTimeout(() => {
        io.emit('update', state);
      }, this.latency);
    }, 45);
  }
  addClient(socket) {
    this.players.entities[socket.id] = new Player(this, socket.id);
    this.clients.push({
      id: socket.id,
      input: {
        step: null,
        data: [],
      },
    });
    console.log(`Client: ${socket.id} has connected`); // eslint-disable-line no-console
  }
  removeClient(socket) {
    delete this.players.entities[socket.id];
    const clientIndex = this.clients.findIndex(obj => obj.id === socket.id);
    this.clients.splice(clientIndex, 1);
    console.log(`Client: ${socket.id} has disconnected`); // eslint-disable-line no-console
  }
};
