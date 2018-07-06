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
  canvasFill(gameArea) {
    for (let i = this.head; i != null; i = i.nextPowerUp) {
      i.canvasFill(gameArea.canvasContext);
    }
  },
  update(time, components, PowerUp, gameArea) {
    this.spawnUpdate(time, components, PowerUp, gameArea);
    for (let i = this.head; i != null; i = i.nextPowerUp) {
      i.update(time, gameArea.canvas.height, components);
    }
  },
  spawnUpdate(time, components, PowerUp, gameArea) {
    components.powerUps.config.spawn.countdown -= time;
    if (components.powerUps.config.spawn.countdown <= 0) {
      components.powerUps.config.spawn.countdown += components.powerUps.config.spawn.randomRate();
      const powerUp = this.create(PowerUp, gameArea);
      this.appendList(components, powerUp);
    }
  },
  create(PowerUp, gameArea) {
    const powerUp = new PowerUp();
    powerUp.positionX = Math.floor(Math.random() * gameArea.canvas.width);
    powerUp.color = this.types[Math.floor(Math.random() * this.types.length)];
    return powerUp;
  },
  appendList(components, powerUp) {
    components.powerUps.head = powerUp.append(components.powerUps.head);
  },
};
