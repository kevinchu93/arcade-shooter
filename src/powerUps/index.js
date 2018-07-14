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
  spawnUpdate(time, components, PowerUp, gameArea) {
    components.powerUps.config.spawn.countdown -= time;
    if (components.powerUps.config.spawn.countdown <= 0) {
      components.powerUps.config.spawn.countdown += components.powerUps.config.spawn.randomRate();
      const powerUp = this.create(PowerUp, gameArea);
      this.appendList();
    }
  },
  create(PowerUp, game) {
    const powerUp = new PowerUp(game);
    powerUp.positionX = Math.floor(Math.random() * game.canvas.width);
    powerUp.color = this.types[Math.floor(Math.random() * this.types.length)];
    return powerUp;
  },
};
