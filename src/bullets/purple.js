const Bullet = require('../objects/bullet/index.js');
const { purple } = require('./config.js');

module.exports = {
  config: purple,
  createPurple(game, player) {
    const findRandomUntargettedEnemy = () => {
      let enemy = game.enemies.head;
      const untargettedEnemiesCount = game.enemies.count - game.enemies.targettedCount;
      const randomUntargettedEnemy = Math.floor(Math.random() * untargettedEnemiesCount);
      while (enemy != null && enemy.stateTargetted === true) {
        enemy = enemy.nextEnemy;
      }
      if (enemy == null) { // no untargetted Enemy
        return null;
      } else if (randomUntargettedEnemy === 0) { // 1 untargetted Enemy
        return enemy;
      }
      for (let i = 0; i < randomUntargettedEnemy; i += 1) { // > 1 untargettedEnemy
        enemy = enemy.nextEnemy;
        while (enemy.stateTargetted !== false) {
          enemy = enemy.nextEnemy;
        }
      }
      return enemy;
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
