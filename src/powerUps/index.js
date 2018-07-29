const PowerUp = require('../objects/powerUp/index.js');

module.exports = class {
  constructor(game) {
    this.game = game;
    this.entities = [];
    this.config = {
      spawn: {
        countdown: null,
        rate: 1000,
        randomRate() {
          return Math.floor(Math.random() * this.rate);
        },
      },
    };
    this.types = ['deepskyblue', 'orangered', 'mediumpurple'];
  }
  draw() {
    for (let i = 0; i < this.game.powerUps.entities.length; i += 1) {
      this.game.canvasContext.fillStyle = this.game.powerUps.entities[i].color;
      this.game.canvasContext.beginPath();
      this.game.canvasContext.arc(
        this.game.powerUps.entities[i].positionX,
        this.game.powerUps.entities[i].positionY,
        this.game.powerUps.entities[i].radius,
        0,
        2 * Math.PI,
      );
      this.game.canvasContext.fill();
    }
  }
  update(time) {
    for (let i = this.entities.length - 1; i >= 0; i -= 1) {
      if (this.entities[i].removeFromGame === true) {
        this.entities.splice(i, 1);
      }
    }
    for (let i = 0; i < this.entities.length; i += 1) {
      this.entities[i].update(time);
    }
  }
  addPowerUp(powerUp) {
    this.entities.push(powerUp);
  }
  spawn() {
    this.config.spawn.countdown -= this.game.timer.deltaTime;
    if (this.config.spawn.countdown <= 0) {
      this.config.spawn.countdown += this.config.spawn.randomRate();
      this.addPowerUp(new PowerUp(this.game));
    }
  }
  getState() {
    const state = [];
    for (let i = 0; i < this.entities.length; i += 1) {
      state.push(this.entities[i].getState());
    }
    return state;
  }
  updateWithServerState() {
    this.entities = [];
    for (let i = 0; this.game.serverState.powerUps.entities[i] != null; i += 1) {
      const powerUp = new PowerUp(this.game);
      Object.keys(this.game.serverState.powerUps.entities[i]).forEach((key) => {
        powerUp[key] = this.game.serverState.powerUps.entities[i][key];
      });
      this.entities[i] = powerUp;
    }
  }
};
