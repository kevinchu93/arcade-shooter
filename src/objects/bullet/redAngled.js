const Default = require('./default.js');

module.exports = class extends Default {
  constructor(game, player, offset, angle) {
    super(game, player);
    this.offset = offset;
    this.angle = angle;
    this.positionX = (player.positionX + ((player.width - this.width) / 2)) + this.offset;
  }
  movement() {
    this.positionX += this.angle * this.speed * (this.game.timer.deltaTime / (1000 / 60));
    this.positionY -= this.speed * (this.game.timer.deltaTime / (1000 / 60));
  }
};
