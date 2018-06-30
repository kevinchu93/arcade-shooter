const Default = require('./default.js');

module.exports = class extends Default {
  constructor(player, offset) {
    super(player);
    this.positionHorizontal =
      (player.positionHorizontal + ((player.width - this.width) / 2)) +
      offset;
  }
};
