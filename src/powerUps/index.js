const PowerUp = require('../objects/powerUp/index.js');

module.exports = class {
  constructor() {
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
  drawDepreciated() {
    for (let i = this.head; i != null; i = i.nextPowerUp) {
      i.draw();
    }
  }
  draw(game, gameState) {
    for (let i = 0; i < gameState.powerUps.entities.length; i += 1) {
      game.canvasContext.fillStyle = gameState.powerUps.entities[i].color;
      game.canvasContext.beginPath();
      game.canvasContext.arc(
        gameState.powerUps.entities[i].positionX,
        gameState.powerUps.entities[i].positionY,
        gameState.powerUps.entities[i].radius,
        0,
        2 * Math.PI,
      );
      game.canvasContext.fill();
    }
  }
  update() {
    for (let i = this.entities.length - 1; i >= 0; i -= 1) {
      if (this.entities[i].removeFromGame === true) {
        this.entities.splice(i, 1);
      }
    }
    for (let i = 0; i < this.entities.length; i += 1) {
      this.entities[i].update();
    }
  }
  addPowerUp(powerUp) {
    this.entities.push(powerUp);
  }
  spawn(game) {
    this.config.spawn.countdown -= game.timer.deltaTime;
    if (this.config.spawn.countdown <= 0) {
      this.config.spawn.countdown += this.config.spawn.randomRate();
      this.addPowerUp(new PowerUp(game));
    }
  }
  getState() {
    const state = [];
    for (let i = 0; i < this.entities.length; i += 1) {
      state.push(this.entities[i].getState());
    }
    return state;
  }
};
