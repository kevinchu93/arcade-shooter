const Player = require('../objects/player/index.js');

module.exports = class {
  constructor(game) {
    this.game = game;
    this.entities = {};
  }
  update(input, time) {
    Object.keys(this.entities).forEach((key) => {
      if (key === this.game.id) {
        this.entities[key].update(input, time);
      }
    });
  }
  updateServer(clients, time) {
    Object.keys(this.entities).forEach((id) => {
      const inputData = clients.find(obj => obj.id === id).input.data;
      this.entities[id].update(inputData, time);
    });
  }
  getState() {
    const state = {};
    Object.keys(this.entities).forEach((key) => {
      state[key] = this.entities[key].getState();
    });
    return state;
  }
  draw() {
    Object.keys(this.game.players.entities).forEach((key) => {
      this.game.canvasContext.fillRect(
        this.game.players.entities[key].positionX,
        this.game.players.entities[key].positionY,
        this.game.players.entities[key].width,
        this.game.players.entities[key].height,
      );
    });
  }
  updateWithServerState() {
    this.entities = {};
    Object.keys(this.game.serverState.players.entities).forEach((id) => {
      this.entities[id] = new Player(this.game, id);
      Object.keys(this.game.serverState.players.entities[id]).forEach((key) => {
        this.entities[id][key] = this.game.serverState.players.entities[id][key];
      });
    });
  }
};
