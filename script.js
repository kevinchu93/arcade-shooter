const Event = require('./event.js');
const components = require('./components/index.js');
const gameArea = require('./gameArea.js');
const Objects = require('./objects/index.js');

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
    components.enemies.update(timeElapsed, 0, 1366, components, Objects.Enemy);
    components.bullets.update(timeElapsed, 0, components, Objects.Bullet, keyMap);
    components.powerUps.update(timeElapsed, components, Objects.PowerUp, gameArea);
    canvasFill(components, gameArea);
    window.requestAnimationFrame(requestAnimationFrameLoop);
  }
  requestAnimationFrameLoop(timeElapsed, timePrevious);
}

window.onload = () => {
  gameArea.start(components);
  update(components, gameArea);
  Event.mouseMove(gameArea.canvasElement, components.player);
  Event.click(gameArea.canvasElement, Objects.Bullet, components);
  Event.keyInput(gameArea.canvasElement, keyMap);
};
