const Bullet = require('./bullet.js');
const Event = require('./event.js');
const Enemy = require('./enemy.js');
const components = require('./components.js');
const gameArea = require('./gameArea.js');

function canvasFill(components, gameArea) {
  gameArea.fill();
  components.player.canvasFill(gameArea.canvasElementDrawingContext);
  components.enemies.canvasFill(gameArea);
  components.bullets.canvasFill(gameArea);
}

function update(components, gameArea) {
  let timeElapsed;
  let timePrevious = 0;

  function requestAnimationFrameLoop(timeStamp) {
    timeStamp = timeStamp || 20; // timeStamp is undefined until window.requestAnimationFrame runs
    timeElapsed = timeStamp - timePrevious;
    timePrevious = timeStamp;

    gameArea.enemySpawnCountdown -= timeElapsed;
    if (gameArea.enemySpawnCountdown <= 0) {
      const enemy = new Enemy(Enemy.getDefaultSpec());
      components.enemies.head = enemy.append(components.enemies.head);
      gameArea.enemySpawnCountdown += 1000;
    }
    components.bullets.update(timeElapsed, 0, components, Bullet);
    components.enemies.update(timeElapsed, 0, 1366, components);
    canvasFill(components, gameArea);
    window.requestAnimationFrame(requestAnimationFrameLoop);
  }
  requestAnimationFrameLoop(timeElapsed, timePrevious);
}

window.onload = () => {
  gameArea.start(components);
  update(components, gameArea);
  Event.mouseMove(gameArea.canvasElement, components.player);
  Event.click(gameArea.canvasElement, Bullet, components, components.player);
};
