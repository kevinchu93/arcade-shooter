const Enemy = require('../objects/enemy/index.js');

module.exports = class {
  constructor() {
    this.entities = [];
    this.head = null;
    this.count = 0;
    this.targettedCount = 0;
    this.totalTime = 0;
    this.config = {
      spawn: {
        countdown: 1000,
        rate: 1000,
      },
    };
  }
  drawDepreciated(game) {
    for (let i = this.head; i != null; i = i.nextEnemy) {
      i.draw();
    }
    game.canvasContext.fillText(this.count, 100, 55);
  }
  draw(game, gameState) {
    for (let i = 0; i < gameState.enemies.entities.length; i += 1) {
      game.canvasContext.fillRect(
        gameState.enemies.entities[i].positionX,
        gameState.enemies.entities[i].positionY,
        gameState.enemies.entities[i].width,
        gameState.enemies.entities[i].height,
      );
    }
  }
  update() {
    for (let i = this.entities.length - 1; i >= 0; i -= 1) {
      if (this.entities[i].removeFromGame === true) {
        if (this.entities[i].stateTargetted === true) {
          this.targettedCount -= 1;
        }
        this.entities.splice(i, 1);
      }
    }
    for (let i = 0; i < this.entities.length; i += 1) {
      this.entities[i].update();
    }
  }
  addEnemy(enemy) {
    this.entities.push(enemy);
  }
  spawn(game) {
    this.config.spawn.countdown -= game.timer.deltaTime;
    if (this.config.spawn.countdown <= 0) {
      this.config.spawn.countdown += this.config.spawn.rate;
      this.addEnemy(new Enemy(game));
    }
  }
  getState() {
    const state = [];
    for (let i = 0; i < this.entities.length; i += 1) {
      state.push(this.entities[i].getState());
    }
    return state;
  }
};
