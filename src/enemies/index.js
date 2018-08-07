const Enemy = require('../objects/enemy/index.js');

module.exports = class {
  constructor(game) {
    this.game = game;
    this.entities = [];
    this.idCount = 0;
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
  draw() {
    for (let i = 0; i < this.game.enemies.entities.length; i += 1) {
      this.game.canvasContext.fillRect(
        this.game.enemies.entities[i].positionX,
        this.game.enemies.entities[i].positionY,
        this.game.enemies.entities[i].width,
        this.game.enemies.entities[i].height,
      );
    }
  }
  update(time) {
    for (let i = this.entities.length - 1; i >= 0; i -= 1) {
      if (this.entities[i].removeFromGame === true) {
        if (this.entities[i].stateTargetted === true) {
          this.targettedCount -= 1;
        }
        this.entities.splice(i, 1);
      }
    }
    for (let i = 0; i < this.entities.length; i += 1) {
      this.entities[i].update(time);
    }
  }
  addEnemy(enemy) {
    this.idCount += 1;
    this.entities.push(enemy);
  }
  spawn() {
    this.config.spawn.countdown -= this.game.timer.deltaTime;
    if (this.config.spawn.countdown <= 0) {
      this.config.spawn.countdown += this.config.spawn.rate;
      this.addEnemy(new Enemy(this.game));
    }
  }
  getState() {
    const state = [];
    for (let i = 0; i < this.entities.length; i += 1) {
      state.push(this.entities[i].getState());
    }
    return state;
  }
  updateWithServerState() {
    this.entities = [];
    for (let i = 0; this.game.serverState.enemies.entities[i] != null; i += 1) {
      const enemy = new Enemy(this.game);
      Object.keys(this.game.serverState.enemies.entities[i]).forEach((key) => {
        enemy[key] = this.game.serverState.enemies.entities[i][key];
      });
      this.entities[i] = enemy;
    }
  }
};
