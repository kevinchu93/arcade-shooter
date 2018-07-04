const config = require('./config.js');

module.exports = function createRed(player, Bullet, bulletArray) {
  switch (player.bulletLevel) {
    case 1:
      bulletArray[0] = new Bullet.Red(player, -config.red.level1.offset);
      bulletArray[1] = new Bullet.Red(player, config.red.level1.offset);
      break;
    case 2:
      bulletArray[0] = new Bullet.Red(player, -config.red.level2.offset);
      bulletArray[1] = new Bullet.Red(player, 0);
      bulletArray[2] = new Bullet.Red(player, config.red.level2.offset);
      break;
    case 3:
      bulletArray[0] = new Bullet.RedAngled(
        player,
        -config.red.level3.offset,
        -config.red.level3.angle,
      );
      bulletArray[1] = new Bullet.Red(player, -config.red.level3.offset);
      bulletArray[2] = new Bullet.Red(player, 0);
      bulletArray[3] = new Bullet.Red(player, config.red.level3.offset);
      bulletArray[4] = new Bullet.RedAngled(
        player,
        config.red.level3.offset,
        config.red.level3.angle,
      );
      break;
    case 4:
      bulletArray[0] = new Bullet.RedAngled(
        player,
        -config.red.level4.offset,
        -config.red.level4.angleOuter,
      );
      bulletArray[1] = new Bullet.RedAngled(
        player,
        -config.red.level4.offset,
        -config.red.level4.angleInner,
      );
      bulletArray[2] = new Bullet.Red(player, -config.red.level4.offset);
      bulletArray[3] = new Bullet.Red(player, 0);
      bulletArray[4] = new Bullet.Red(player, config.red.level4.offset);
      bulletArray[5] = new Bullet.RedAngled(
        player,
        config.red.level4.offset,
        config.red.level4.angleInner,
      );
      bulletArray[6] = new Bullet.RedAngled(
        player,
        config.red.level4.offset,
        config.red.level4.angleOuter,
      );
      break;
    case 5:
      bulletArray[0] = new Bullet.RedAngled(
        player,
        -config.red.level5.offset,
        -config.red.level5.angleOuter,
      );
      bulletArray[1] = new Bullet.RedAngled(
        player,
        -config.red.level5.offset,
        -config.red.level5.angleMiddle,
      );
      bulletArray[2] = new Bullet.RedAngled(
        player,
        -config.red.level5.offset,
        -config.red.level5.angleInner,
      );
      bulletArray[3] = new Bullet.Red(player, -config.red.level5.offset);
      bulletArray[4] = new Bullet.Red(player, 0);
      bulletArray[5] = new Bullet.Red(player, config.red.level5.offset);
      bulletArray[6] = new Bullet.RedAngled(
        player,
        config.red.level5.offset,
        config.red.level5.angleInner,
      );
      bulletArray[7] = new Bullet.RedAngled(
        player,
        config.red.level5.offset,
        config.red.level5.angleMiddle,
      );
      bulletArray[8] = new Bullet.RedAngled(
        player,
        config.red.level5.offset,
        config.red.level5.angleOuter,
      );
      break;
    default:
      break;
  }
  return bulletArray;
};
