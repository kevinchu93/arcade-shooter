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
  draw() {
    for (let i = this.head; i != null; i = i.nextPowerUp) {
      i.draw();
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
};
