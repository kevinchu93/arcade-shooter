const config = require('./config.js');

module.exports = function createPurple(components, Bullet) {
  function checkTargettedState(components, enemyHead) {
    let enemy = enemyHead;
    const enemyTarget = Math.floor(Math.random() *
      (components.enemies.count - components.enemies.targettedCount));
    while (enemy != null && enemy.targettedState === true) {
      enemy = enemy.nextEnemy;
    }
    if (enemy == null || enemyTarget === -1) { // case 1: no enemies with tragettedState: false
      return null;
    }
    if (enemyTarget === 0) { // case 2: 1 enemy with targettedState: false
      return enemy;
    }
    for (let i = 0; i < enemyTarget; i += 1) { // case 3: > 1 enemy with targettedState: false
      enemy = enemy.nextEnemy;
      while (enemy.targettedState !== false) {
        enemy = enemy.nextEnemy;
      }
    }
    return enemy;
  }
  // const enemyTarget = Math.floor(Math.random() * (components.enemies.count - components.enemies.targettedCount));
  const enemy = checkTargettedState(components, components.enemies.head);
  switch (components.player.level) {
    case 1:
      if (
        enemy == null ||
        components.bullets.bulletCountPurple >= config.purple.level1.maxBullets
      ) {
        return null;
      }
      break;
    case 2:
      if (
        enemy == null ||
        components.bullets.bulletCountPurple >= config.purple.level2.maxBullets
      ) {
        return null;
      }
      break;
    case 3:
      if (
        enemy == null ||
        components.bullets.bulletCountPurple >= config.purple.level3.maxBullets
      ) {
        return null;
      }
      break;
    case 4:
      if (
        enemy == null ||
        components.bullets.bulletCountPurple >= config.purple.level4.maxBullets
      ) {
        return null;
      }
      break;
    case 5:
      if (
        enemy == null ||
        components.bullets.bulletCountPurple >= config.purple.level5.maxBullets
      ) {
        return null;
      }
      break;
    default:
      break;
  }
  return new Bullet.Purple(components.player, enemy, components);
};
