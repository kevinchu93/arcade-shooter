module.exports = {
  head: null,
  spawn: {
    countdown: null,
    rate() {
      return Math.floor(Math.random() * 10000);
    },
  },
  types: ['deepskyblue', 'orangered', 'mediumpurple'],
  canvasFill(gameArea) {
    for (let i = this.head; i != null; i = i.nextPowerUp) {
      i.canvasFill(gameArea.canvasElementDrawingContext);
    }
  },
  update(timeElapsed, components, PowerUp, gameArea) {
    this.spawnUpdate(timeElapsed, components, PowerUp);
    for (let i = this.head; i != null; i = i.nextPowerUp) {
      i.update(timeElapsed, gameArea.canvasElement.height, components);
    }
  },
  spawnUpdate(timeElapsed, components, PowerUp) {
    components.powerUps.spawn.countdown -= timeElapsed;
    if (components.powerUps.spawn.countdown <= 0) {
      components.powerUps.spawn.countdown += components.powerUps.spawn.rate();
      const powerUp = this.createNew(PowerUp);
      this.appendNewPowerUp(components, powerUp);
    }
  },
  createNew(PowerUp) {
    const powerUp = new PowerUp(PowerUp.getDefaultSpec());
    powerUp.positionHorizontal = Math.floor(Math.random() * 1366);
    powerUp.color = this.types[Math.floor(Math.random() * 3)];
    return powerUp;
  },
  appendNewPowerUp(components, powerUp) {
    components.powerUps.head = powerUp.append(components.powerUps.head);
  },
};
