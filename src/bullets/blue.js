const Bullet = require('../objects/bullet/index.js');
const { blue } = require('./config.js');

module.exports = {
  config: blue,
  createBlue(game, player) {
    let bullet = {};
    switch (player.bulletLevel) {
      case 1:
        bullet = new Bullet.Blue(
          game,
          player,
          this.config.level1.width,
          this.config.level1.height,
        );
        break;
      case 2:
        bullet = new Bullet.Blue(
          game,
          player,
          this.config.level2.width,
          this.config.level2.height,
        );
        break;
      case 3:
        bullet = new Bullet.Blue(
          game,
          player,
          this.config.level3.width,
          this.config.level3.height,
        );
        break;
      case 4:
        bullet = new Bullet.Blue(
          game,
          player,
          this.config.level4.width,
          this.config.level4.height,
        );
        break;
      case 5:
        bullet = new Bullet.Blue(
          game,
          player,
          this.config.level5.width,
          this.config.level5.height,
        );
        break;
      default:
        break;
    }
    return bullet;
  },
};
