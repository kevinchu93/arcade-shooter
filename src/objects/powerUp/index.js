module.exports = class {
  constructor(game) {
    this.game = game;
    this.radius = 5;
    this.speed = 2;
    this.positionX = Math.floor(Math.random() * game.canvas.width);
    this.positionY = null;
    this.color = game.powerUps.types[Math.floor(Math.random() * game.powerUps.types.length)];
    this.removeFromGame = false;
    this.nextPowerUp = null;
  }
  draw() {
    this.game.canvasContext.fillStyle = this.color;
    this.game.canvasContext.beginPath();
    this.game.canvasContext.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
    this.game.canvasContext.fill();
  }
  movement() {
    this.positionY += this.speed * (this.game.timer.deltaTime / (1000 / 60));
  }
  update() {
    if (this.removeFromGame) {
      this.game.powerUps.head = this.remove();
    }
    this.movement();
    this.boundaryCheck();
  }
  boundaryCheck() {
    if (this.positionY >= this.game.canvas.height) {
      this.removeFromGame = true;
    }
  }
  append() {
    if (this.game.powerUps.head == null) {
      return this;
    }
    for (let i = this.game.powerUps.head; i != null; i = i.nextPowerUp) {
      if (i.nextPowerUp == null) {
        i.nextPowerUp = this;
        i = i.nextPowerUp;
      }
    }
    return this.game.powerUps.head;
  }
  remove() {
    if (this.game.powerUps.head === this) {
      return this.game.powerUps.head.nextPowerUp;
    }
    for (let i = this.game.powerUps.head; i.nextPowerUp != null; i = i.nextPowerUp) {
      if (i.nextPowerUp === this) {
        i.nextPowerUp = i.nextPowerUp.nextPowerUp;
      }
      if (i.nextPowerUp == null) {
        return this.game.powerUps.head;
      }
    }
    return this.game.powerUps.head;
  }
};
