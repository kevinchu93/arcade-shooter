const Bullet = require('./bullet.js');
const OrangeRed = require('./orangered.js');
const DeepSkyBlue = require('./deepskyblue.js');
const Event = require('./event.js');
const Enemy = require('./enemy.js');
const components = require('./components/index.js');
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

    components.player.update(timeElapsed, gameArea.canvasElement, keyMap, components);
    components.bullets.update(timeElapsed, 0, components, Bullet, keyMap);
    components.enemies.update(timeElapsed, 0, 1366, components, Enemy);
    components.powerUps.update(timeElapsed, components, PowerUp, gameArea);
    canvasFill(components, gameArea);
    window.requestAnimationFrame(requestAnimationFrameLoop);
  }
  requestAnimationFrameLoop(timeElapsed, timePrevious);
}

window.onload = () => {
  gameArea.start(components);
  update(components, gameArea);
  Event.mouseMove(gameArea.canvasElement, components.player);
  Event.click(gameArea.canvasElement, Bullet, components, OrangeRed, DeepSkyBlue);
  Event.keyInput(gameArea.canvasElement, components, Bullet, keyMap);
};
