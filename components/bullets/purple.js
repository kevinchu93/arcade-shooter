const { purple } = require('./config.js');

module.exports = {
  config: purple,
  createPurple(components, Bullet, canvas) {
    function checkStateTargetted(enemyHead) {
      let enemy = enemyHead;
      const nonTargettedEnemyCount = Math.floor(Math.random() *
        (components.enemies.count - components.enemies.targettedCount));
      while (enemy != null && enemy.stateTargetted === true) {
        enemy = enemy.nextEnemy;
      }
      if (enemy == null || nonTargettedEnemyCount === -1) { // no enemies with stateTargetted: false
        return null;
      } else if (nonTargettedEnemyCount === 0) { // 1 enemy with stateTargetted: false
        return enemy;
      }
      for (let i = 0; i < nonTargettedEnemyCount; i += 1) { // > 1 enemy with stateTargetted: false
        enemy = enemy.nextEnemy;
        while (enemy.stateTargetted !== false) {
          enemy = enemy.nextEnemy;
        }
      }
      return enemy;
    }
    const enemy = checkStateTargetted(components.enemies.head);
    switch (components.player.bulletLevel) {
      case 1:
        if (
          enemy == null ||
          components.bullets.bulletCountPurple >= this.config.level1.maxBullets
        ) {
          return null;
        }
        break;
      case 2:
        if (
          enemy == null ||
          components.bullets.bulletCountPurple >= this.config.level2.maxBullets
        ) {
          return null;
        }
        break;
      case 3:
        if (
          enemy == null ||
          components.bullets.bulletCountPurple >= this.config.level3.maxBullets
        ) {
          return null;
        }
        break;
      case 4:
        if (
          enemy == null ||
          components.bullets.bulletCountPurple >= this.config.level4.maxBullets
        ) {
          return null;
        }
        break;
      case 5:
        if (
          enemy == null ||
          components.bullets.bulletCountPurple >= this.config.level5.maxBullets
        ) {
          return null;
        }
        break;
      default:
        break;
    }
    return new Bullet.Purple(components.player, enemy, components, canvas);
  },
};
