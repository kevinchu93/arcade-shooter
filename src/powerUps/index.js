const PowerUp = require('../objects/powerUp/index.js');

module.exports = {
  head: null,
  config: {
    spawn: {
      countdown: null,
      rate: 1000,
      randomRate() {
        return Math.floor(Math.random() * this.rate);
      },
    },
  },
  types: ['deepskyblue', 'orangered', 'mediumpurple'],
  drawDepreciated() {
    for (let i = this.head; i != null; i = i.nextPowerUp) {
      i.draw();
    }
  },
  draw(game, gameState) {
    for (let i = 0; gameState.powerUps[i] != null; i += 1) {
      game.canvasContext.fillStyle = gameState.powerUps[i].color;
      game.canvasContext.beginPath();
      game.canvasContext.arc(
        gameState.powerUps[i].positionX,
        gameState.powerUps[i].positionY,
        gameState.powerUps[i].radius,
        0,
        2 * Math.PI,
      );
      game.canvasContext.fill();
    }
  },
  update() {
    for (let i = this.head; i != null; i = i.nextPowerUp) {
      i.update();
    }
  },
  spawn(game) {
    this.config.spawn.countdown -= game.timer.deltaTime;
    if (this.config.spawn.countdown <= 0) {
      this.config.spawn.countdown += this.config.spawn.randomRate();
      game.powerUps.head = new PowerUp(game).append();
    }
  },
  getState(gameServer) {
    for (let i = this.head; i != null; i = i.nextPowerUp) {
      gameServer.gameState.powerUps.push(i.getState());
    }
  },
};
