module.exports = {
  head: null,
  config: {
    spawn: {
      countdown: null,
      rate() {
        return Math.floor(Math.random() * 1000);
      },
    },
  },
  types: ['deepskyblue', 'orangered', 'mediumpurple'],
  canvasFill(gameArea) {
    for (let i = this.head; i != null; i = i.nextPowerUp) {
      i.canvasFill(gameArea.canvasElementDrawingContext);
    }
  },
  update(timeElapsed, components, PowerUp, gameArea) {
    this.spawnUpdate(timeElapsed, components, PowerUp, gameArea);
    for (let i = this.head; i != null; i = i.nextPowerUp) {
      i.update(timeElapsed, gameArea.canvasElement.height, components);
    }
  },
  spawnUpdate(timeElapsed, components, PowerUp, gameArea) {
    components.powerUps.config.spawn.countdown -= timeElapsed;
    if (components.powerUps.config.spawn.countdown <= 0) {
      components.powerUps.config.spawn.countdown += components.powerUps.config.spawn.rate();
      const powerUp = this.createNew(PowerUp, gameArea);
      this.appendNewPowerUp(components, powerUp);
    }
  },
  createNew(PowerUp, gameArea) {
    const powerUp = new PowerUp(PowerUp.getDefaultSpec());
    powerUp.positionHorizontal = Math.floor(Math.random() * gameArea.canvasElement.width);
    powerUp.color = this.types[Math.floor(Math.random() * this.types.length)];
    return powerUp;
  },
  appendNewPowerUp(components, powerUp) {
    components.powerUps.head = powerUp.append(components.powerUps.head);
  },
};
