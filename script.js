const Bullet = require('./bullet.js');
const Event = require('./event.js');
const Enemy = require('./enemy.js');
const components = require('./components.js');
const gameArea = require('./gameArea.js');
const PowerUp = require('./powerUp.js');

const keyMap = [];

function canvasFill(components, gameArea) {
  gameArea.fill();
  components.player.canvasFill(gameArea.canvasElementDrawingContext);
  components.enemies.canvasFill(gameArea);
  components.bullets.canvasFill(gameArea);
  components.powerUps.canvasFill(gameArea);
}

function update(components, gameArea) {
  let timeElapsed;
  let timePrevious = 0;

  function requestAnimationFrameLoop(timeStamp) {
    timeStamp = timeStamp || 20; // timeStamp is undefined until window.requestAnimationFrame runs
    timeElapsed = timeStamp - timePrevious;
    timePrevious = timeStamp;

    gameArea.enemySpawnCountdown -= timeElapsed;
    gameArea.powerUpSpawnCountdown -= timeElapsed;
    if (gameArea.powerUpSpawnCountdown <= 0) {
      const powerUp = new PowerUp(PowerUp.getDefaultSpec());
      powerUp.positionHorizontal = Math.floor(Math.random() * 1366);
      components.powerUps.head = powerUp.append(components.powerUps.head);
      gameArea.powerUpSpawnCountdown += Math.floor(Math.random() * 10000);
    }
    if (gameArea.enemySpawnCountdown <= 0) {
      const enemy = new Enemy(Enemy.getDefaultSpec());
      components.enemies.head = enemy.append(components.enemies.head);
      gameArea.enemySpawnCountdown += 1000;
    }

    components.player.update(timeElapsed, gameArea.canvasElement, keyMap);
    components.bullets.update(timeElapsed, 0, components, Bullet, keyMap);
    components.enemies.update(timeElapsed, 0, 1366, components);
    components.powerUps.update(timeElapsed);
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
  Event.keyInput(gameArea.canvasElement, components, Bullet, keyMap);
};
