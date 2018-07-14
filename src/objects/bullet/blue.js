const Default = require('./default.js');

module.exports = class extends Default {
  constructor(game, width, height) {
    super(game);
    this.width = width;
    this.height = height;
    this.positionX = game.player.positionX + ((game.player.width - this.width) / 2);
    this.positionY = game.player.positionY;
  }
  update(components) {
    super.boundaryCheck();
    super.movement();
    this.hitCheck();
  }
  hitCheck() {
    const Ax1 = this.positionX;
    const Ax2 = this.positionX + this.width;
    const Ay1 = this.positionY;
    const Ay2 = this.positionY + this.height;
    for (let i = this.game.enemies.head; i != null; i = i.nextEnemy) {
      if (i.removeFromGame === false) {
        const Bx1 = i.positionX;
        const Bx2 = i.positionX + i.width;
        const By1 = i.positionY;
        const By2 = i.positionY + i.height;
        if (super.constructor.rectangleCollision(Ax1, Ax2, Ay1, Ay2, Bx1, Bx2, By1, By2)) {
          i.removeFromGame = true;
          this.game.player.score += 1;
        }
      }
    }
  }
  draw() {
    const gradient = this.game.canvasContext.createLinearGradient(0, 500, 0, 800);
    gradient.addColorStop(0, 'deepskyblue');
    gradient.addColorStop(1, 'dodgerblue');
    this.game.canvasContext.fillStyle = gradient;
    this.game.canvasContext.fillRect(
      this.positionX,
      this.positionY,
      this.width,
      this.height,
    );
  }
};
