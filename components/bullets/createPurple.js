const config = require('./config.js');

module.exports = function createPurple(components, Bullet) {
  let enemyTarget = Math.floor(Math.random() * components.enemies.count);
  let enemyHead = components.enemies.head;
  for (let i = 0; i < enemyTarget; i += 1) {
    enemyHead = enemyHead.nextEnemy;
  }
  console.log(enemyHead);
  let bullet = {};
  switch (components.player.level) {
    case 1:
      if (enemyHead == null) {
        return null;
      }
      bullet = new Bullet.Purple(components.player, enemyHead);
      components.enemies.head = enemyHead.remove(components.enemies.head, components.enemies);
      break;
  }
  return bullet;
};
