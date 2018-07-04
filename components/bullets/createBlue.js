const config = require('./config.js');

module.exports = function createBlue(player, Bullet) {
  let bullet = {};
  switch (player.bulletLevel) {
    case 1:
      bullet = new Bullet.Blue(
        player,
        config.blue.level1.width,
        config.blue.level1.height,
      );
      break;
    case 2:
      bullet = new Bullet.Blue(
        player,
        config.blue.level2.width,
        config.blue.level2.height,
      );
      break;
    case 3:
      bullet = new Bullet.Blue(
        player,
        config.blue.level3.width,
        config.blue.level3.height,
      );
      break;
    case 4:
      bullet = new Bullet.Blue(
        player,
        config.blue.level4.width,
        config.blue.level4.height,
      );
      break;
    case 5:
      bullet = new Bullet.Blue(
        player,
        config.blue.level5.width,
        config.blue.level5.height,
      );
      break;
    default:
      break;
  }
  return bullet;
};
