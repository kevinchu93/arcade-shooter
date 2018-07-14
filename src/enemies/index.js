module.exports = {
  head: null,
  count: 0,
  targettedCount: 0,
  totalTime: 0,
  spawn: {
    countdown: 1000,
    rate: 1000,
  },
  draw(game) {
    for (let i = this.head; i != null; i = i.nextEnemy) {
      i.draw();
    }
    game.canvasContext.fillText(this.count, 100, 55);
  },
  update() {
    for (let i = this.head; i != null; i = i.nextEnemy) {
      i.update();
    }
  },
  spawnUpdate(time, components, Enemy) {
    components.enemies.spawn.countdown -= time;
    if (components.enemies.spawn.countdown <= 0) {
      components.enemies.spawn.countdown += components.enemies.spawn.rate;
      const enemy = new Enemy();
      this.appendList(components, enemy);
    }
  },
  appendList(components, enemy) {
    components.enemies.head = enemy.append(components.enemies.head, components.enemies);
  },
};
