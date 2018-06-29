const Default = require('./default.js');

module.exports = class extends Default {
  constructor(player, width, height) {
    super(player);
    this.width = width;
    this.height = height;
    this.positionHorizontal = player.positionHorizontal + ((player.width - this.width) / 2);
    this.positionVertical = player.positionVertical - this.height;
  }
  update(timeElapsed, boundary, components) {
    super.boundaryCheck(boundary, components);
    super.movement(timeElapsed);
    components.player.score += this.hitCheck(components.enemies.head);
  }
  hitCheck(enemyHead) {
    let hitCount = 0;
    const Ax1 = this.positionHorizontal;
    const Ax2 = this.positionHorizontal + this.width;
    const Ay1 = this.positionVertical;
    const Ay2 = this.positionVertical + this.height
    for (let i = enemyHead; i != null; i = i.nextEnemy) {
      if (i.hitState == false) {
        const Bx1 = i.positionHorizontal;
        const Bx2 = i.positionHorizontal + i.width;
        const By1 = i.positionVertical;
        const By2 = i.positionVertical + i.height;
        if (super.rectangleCollision(Ax1, Ax2, Ay1, Ay2, Bx1, Bx2, By1, By2)) {
          i.hitState = true;
          hitCount += 1;
        }
      }
    }
    return hitCount;
  }
};
