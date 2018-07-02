module.exports = {
  head: null,
  count: 0,
  targettedCount: 0,
  spawn: {
    countdown: 1000,
    rate: 1000,
  },
  canvasFill(gameArea) {
    for (let i = this.head; i != null; i = i.nextEnemy) {
      i.canvasFill(gameArea.canvasElementDrawingContext);
    }
    gameArea.canvasElementDrawingContext.fillText(this.count, 100, 55);
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
      const enemy = this.createNew(Enemy);
      this.appendNewEnemy(components, enemy);
    }
  },
  createNew(Enemy) {
    const enemy = new Enemy(Enemy.getDefaultSpec());
    return enemy;
  },
  appendNewEnemy(components, enemy) {
    components.enemies.head = enemy.append(components.enemies.head, components.enemies);
  },
};
