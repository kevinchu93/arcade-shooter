module.exports = {
  head: null,
  spawn: {
    countdown: null,
    rate: 1000,
  },
  canvasFill(gameArea) {
    for (let i = this.head; i != null; i = i.nextEnemy) {
      i.canvasFill(gameArea.canvasElementDrawingContext);
    }
  },
  update(timeElapsed, boundaryLeft, boundaryRight, components, Enemy) {
    this.spawnUpdate(timeElapsed, components, Enemy);
    for (let i = this.head; i != null; i = i.nextEnemy) {
      i.update(timeElapsed, boundaryLeft, boundaryRight, components);
    }
  },
  spawnUpdate(timeElapsed, components, Enemy) {
    components.enemies.spawn.countdown -= timeElapsed;
    if (components.enemies.spawn.countdown <= 0) {
      components.enemies.spawn.countdown += components.enemies.spawn.rate;
      const enemy = this.createNew(components, Enemy);
      this.appendNewEnemy(components, enemy);
    }
  },
  createNew(components, Enemy) {
    const enemy = new Enemy(Enemy.getDefaultSpec());
    return enemy;
  },
  appendNewEnemy(components, enemy) {
    components.enemies.head = enemy.append(components.enemies.head);
  },
};
