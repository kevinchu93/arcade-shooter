const Bullet = require('./bullet.js');

module.exports = class extends Bullet {
  constructor(player) {
    super(player);
    this.width = 30;
  }
  update(timeElapsed, boundary, components) {
    super.boundaryCheck(boundary, components);
    super.movement(timeElapsed);
    if (super.hitCheck(components.enemies.head)) {
      components.player.score += 1;
    }
  }
}
