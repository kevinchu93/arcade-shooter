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
      i.canvasFill(gameArea.canvasContext);
    }
    gameArea.canvasContext.fillText(this.count, 100, 55);
  },
  update(time, boundaryLeft, boundaryRight, components, Enemy) {
    this.spawnUpdate(time, components, Enemy);
    for (let i = this.head; i != null; i = i.nextEnemy) {
      i.update(time, boundaryLeft, boundaryRight, components);
    }
  },
  spawnUpdate(time, components, Enemy) {
    components.enemies.spawn.countdown -= time;
    if (components.enemies.spawn.countdown <= 0) {
      components.enemies.spawn.countdown += components.enemies.spawn.rate;
      const enemy = this.create(Enemy);
      this.appendList(components, enemy);
    }
  },
  create(Enemy) {
    return new Enemy();
  },
  appendList(components, enemy) {
    components.enemies.head = enemy.append(components.enemies.head, components.enemies);
  },
};
