const Default = require('./default.js');

module.exports = class extends Default {
  constructor(game, player, width, height) {
    super(game, player);
    this.width = width;
    this.height = height;
    this.positionX = player.positionX + ((player.width - this.width) / 2);
    this.positionY = player.positionY;
  }
  update(time) {
    super.boundaryCheck();
    super.movement(time);
    this.hitCheck();
  }
  hitCheck() {
    const Ax1 = this.positionX;
    const Ax2 = this.positionX + this.width;
    const Ay1 = this.positionY;
    const Ay2 = this.positionY + this.height;
    for (let i = 0; i < this.game.enemies.entities.length; i += 1) {
      const enemy = this.game.enemies.entities[i];
      if (enemy.removeFromGame === false) {
        const Bx1 = enemy.positionX;
        const Bx2 = enemy.positionX + enemy.width;
        const By1 = enemy.positionY;
        const By2 = enemy.positionY + enemy.height;
        if (super.constructor.rectangleCollision(Ax1, Ax2, Ay1, Ay2, Bx1, Bx2, By1, By2)) {
          enemy.removeFromGame = true;
          this.game.players.entities[this.playerId].score += 1;
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
