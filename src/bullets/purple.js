const Bullet = require('../objects/bullet/index.js');
const { purple } = require('./config.js');

module.exports = {
  config: purple,
  createPurple(game, player) {
    const findRandomUntargettedEnemy = () => {
      const untargettedEnemiesCount = game.enemies.entities.length - game.enemies.targettedCount;
      if (untargettedEnemiesCount === 0) {
        return null;
      }
      let randomUntargettedEnemy = Math.floor(Math.random() * untargettedEnemiesCount) + 1;
      for (let i = 0; randomUntargettedEnemy > 0; i += 1) {
        if (game.enemies.entities[i].stateTargetted === false) {
          randomUntargettedEnemy -= 1;
        }
        if (randomUntargettedEnemy === 0) {
          return game.enemies.entities[i];
        }
      }
      return null; // restructure so this return has meaning
    };
    const enemy = findRandomUntargettedEnemy();
    if (enemy == null) {
      return null;
    }
    switch (player.bulletLevel) {
      case 1:
        if (game.bullets.bulletCountPurple >= this.config.level1.maxBullets) {
          return null;
        }
        break;
      case 2:
        if (game.bullets.bulletCountPurple >= this.config.level2.maxBullets) {
          return null;
        }
        break;
      case 3:
        if (game.bullets.bulletCountPurple >= this.config.level3.maxBullets) {
          return null;
        }
        break;
      case 4:
        if (game.bullets.bulletCountPurple >= this.config.level4.maxBullets) {
          return null;
        }
        break;
      case 5:
        if (game.bullets.bulletCountPurple >= this.config.level5.maxBullets) {
          return null;
        }
        break;
      default:
        break;
    }
    return new Bullet.Purple(game, player, enemy);
  },
};
