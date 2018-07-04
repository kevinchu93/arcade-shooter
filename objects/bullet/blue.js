const Default = require('./default.js');

module.exports = class extends Default {
  constructor(player, width, height) {
    super(player);
    this.width = width;
    this.height = height;
    this.positionX = player.positionX + ((player.width - this.width) / 2);
    this.positionY = player.positionY - this.height;
  }
  update(time, boundary, components) {
    super.boundaryCheck(boundary, components);
    super.movement(time);
    components.player.score += this.hitCheck(components.enemies.head);
  }
  hitCheck(enemyHead) {
    let hitCount = 0;
    const Ax1 = this.positionX;
    const Ax2 = this.positionX + this.width;
    const Ay1 = this.positionY;
    const Ay2 = this.positionY + this.height;
    for (let i = enemyHead; i != null; i = i.nextEnemy) {
      if (i.stateHit === false) {
        const Bx1 = i.positionX;
        const Bx2 = i.positionX + i.width;
        const By1 = i.positionY;
        const By2 = i.positionY + i.height;
        if (super.constructor.rectangleCollision(Ax1, Ax2, Ay1, Ay2, Bx1, Bx2, By1, By2)) {
          i.stateHit = true;
          hitCount += 1;
        }
      }
    }
    return hitCount;
  }
  canvasFill(context) {
    const gradient = context.createLinearGradient(0, 500, 0, 800);
    gradient.addColorStop(0, 'deepskyblue');
    gradient.addColorStop(1, 'dodgerblue');
    context.fillStyle = gradient;
    context.fillRect(
      this.positionX,
      this.positionY,
      this.width,
      this.height,
    );
  }
};
