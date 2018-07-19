const Enemy = require('../objects/enemy/index.js');

module.exports = {
  head: null,
  count: 0,
  targettedCount: 0,
  totalTime: 0,
  config: {
    spawn: {
      countdown: 1000,
      rate: 1000,
    },
  },
  drawDepreciated(game) {
    for (let i = this.head; i != null; i = i.nextEnemy) {
      i.draw();
    }
    game.canvasContext.fillText(this.count, 100, 55);
  },
  draw(game, gameState) {
    for (let i = 0; gameState.enemies[i] != null; i += 1) {
      game.canvasContext.fillRect(
        gameState.enemies[i].positionX,
        gameState.enemies[i].positionY,
        gameState.enemies[i].width,
        gameState.enemies[i].height,
      );
    }
  },
  update() {
    for (let i = this.head; i != null; i = i.nextEnemy) {
      i.update();
    }
  },
  spawn(game) {
    game.enemies.config.spawn.countdown -= game.timer.deltaTime;
    if (game.enemies.config.spawn.countdown <= 0) {
      game.enemies.config.spawn.countdown += game.enemies.config.spawn.rate;
      game.enemies.head = new Enemy(game).append();
    }
  },
  getState(gameServer) {
    for (let i = this.head; i != null; i = i.nextEnemy) {
      gameServer.gameState.enemies.push(i.getState());
    }
  },
};
