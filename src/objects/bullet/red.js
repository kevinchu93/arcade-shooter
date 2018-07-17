const Default = require('./default.js');

module.exports = class extends Default {
  constructor(game, player, offset) {
    super(game, player);
    this.positionX = (player.positionX + ((player.width - this.width) / 2)) + offset;
  }
};
