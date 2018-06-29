const Default = require('./Default.js');

module.exports = class extends Default {
  constructor(player) {
    super(player);
    this.width = 30;
  }
  update(timeElapsed, boundary, components) {
    super.boundaryCheck(boundary, components);
    super.movement(timeElapsed);
    components.player.score += this.hitCheck(components.enemies.head);
  }
  hitCheck(enemyHead) {
    let hitCount = 0;
    for (let i = enemyHead; i != null; i = i.nextEnemy) {
      if (
        (
          (
            this.positionVertical >= i.positionVertical &&
            this.positionVertical <= i.positionVertical + i.height
          ) ||
          (
            this.positionVertical + this.height >= i.positionVertical &&
            this.positionVertical + this.height <= i.positionVertical + i.height
          )
        ) &&
        (
          (
            i.positionHorizontal >= this.positionHorizontal &&
            i.positionHorizontal <= this.positionHorizontal + this.width
          ) ||
          (
            i.positionHorizontal + i.width >= this.positionHorizontal &&
            i.positionHorizontal <= this.positionHorizontal + this.width
          )
        )
      ) {
        i.hitState = true;
        hitCount += 1;
      }
    }
    return hitCount;
  }
};
