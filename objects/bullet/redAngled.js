const Default = require('./default.js');

module.exports = class extends Default {
  constructor(player, offset, angle) {
    super(player);
    this.offset = offset;
    this.angle = angle;
    this.positionHorizontal =
      (player.positionHorizontal + ((player.width - this.width) / 2)) +
      this.offset;
  }
  movement(time) {
    this.positionVertical -= this.speed * (time / (1000 / 60));
    this.positionHorizontal += this.angle * this.speed * (time / (1000 / 60));
  }
};
