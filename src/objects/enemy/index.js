module.exports = class {
  constructor(game) {
    this.game = game;
    this.width = 20;
    this.height = 10;
    this.positionX = 350;
    this.positionY = 75;
    this.speed = 10;
    this.removeFromGame = false;
    this.nextEnemy = null;
    this.stateTargetted = false;
  }
  draw() {
    this.game.canvasContext.fillRect(
      this.positionX,
      this.positionY,
      this.width,
      this.height,
    );
  }
  movement() {
    this.positionX += this.speed * (this.game.timer.deltaTime / (1000 / 60));
  }
  boundaryCheck() {
    if (this.positionX <= 0 && this.speed < 0) {
      this.speed = -this.speed;
    } else if ((this.positionX + this.width) >= this.game.canvas.width && this.speed > 0) {
      this.speed = -this.speed;
    }
  }
  update() {
    if (this.removeFromGame) {
      this.game.enemies.head = this.remove();
    }
    this.movement();
    this.boundaryCheck();
  }
  append() {
    this.game.enemies.count += 1;
    if (this.game.enemies.head == null) {
      return this;
    }
    for (let i = this.game.enemies.head; i != null; i = i.nextEnemy) {
      if (i.nextEnemy == null) {
        i.nextEnemy = this;
        i = i.nextEnemy;
      }
    }
    return this.game.enemies.head;
  }
  remove() {
    if (this.stateTargetted === true) {
      this.game.enemies.targettedCount -= 1;
    }
    this.game.enemies.count -= 1;
    if (this.game.enemies.head === this) {
      return this.game.enemies.head.nextEnemy;
    }
    for (let i = this.game.enemies.head; i.nextEnemy != null; i = i.nextEnemy) {
      if (i.nextEnemy === this) {
        i.nextEnemy = i.nextEnemy.nextEnemy;
      }
      if (i.nextEnemy == null) {
        return this.game.enemies.head;
      }
    }
    return this.game.enemies.head;
  }
};
