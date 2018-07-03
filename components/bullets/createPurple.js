const config = require('./config.js');

module.exports = function createPurple(components, Bullet) {
  function checkTargettedState(components, enemyHead) {
    const enemyTarget = components.enemies.count - components.enemies.targettedCount - 1;
    if (enemyHead == null || enemyTarget == -1) {  //case 1: no enemies in list
      return null
    };
    if (enemyTarget == 0) { //case 2: 1 enemy with targettedState = true
      while (enemyHead.targettedState == true) {
        enemyHead = enemyHead.nextEnemy;
      }
      return enemyHead;
    }
    for (let i = 0; i < enemyTarget; i += 1) {  //case 3: multiple enemy with targettedState = false
      enemyHead = enemyHead.nextEnemy;
      while (enemyHead.targettedState != false) {
        enemyHead = enemyHead.nextEnemy;
      }
    }
    return enemyHead
  }
  //const enemyTarget = Math.floor(Math.random() * (components.enemies.count - components.enemies.targettedCount));
  let enemy = checkTargettedState(components, components.enemies.head);
  let bullet = null; 
  switch (components.player.level) {
    case 1:
      if (enemy == null) {
        return null;
      }
      return new Bullet.Purple(components.player, enemy, components);
      break;
    case 2:
      if (enemyHead == null) {
        return null;
      }
      bullet = new Bullet.Purple(components.player, enemyHead);
      components.enemies.head = enemyHead.remove(components.enemies.head, components.enemies);
      break;
    case 3:
      if (enemyHead == null) {
        return null;
      }
      bullet = new Bullet.Purple(components.player, enemyHead);
      components.enemies.head = enemyHead.remove(components.enemies.head, components.enemies);
      break;
    case 4:
      if (enemyHead == null) {
        return null;
      }
      bullet = new Bullet.Purple(components.player, enemyHead);
      components.enemies.head = enemyHead.remove(components.enemies.head, components.enemies);
      break;
    case 5:
      if (enemyHead == null) {
        return null;
      }
      bullet = new Bullet.Purple(components.player, enemyHead);
      components.enemies.head = enemyHead.remove(components.enemies.head, components.enemies);
      break;
    default:
      break;
  }
  return bullet;
};
