const Default = require('./default.js');

module.exports = class extends Default {
  constructor(game, offset) {
    super(game);
    this.positionX = (game.player.positionX + ((game.player.width - this.width) / 2)) + offset;
  }
};
