const events = require('./events.js');
const components = require('./components/index.js');
const gameArea = require('./gameArea.js');
const Objects = require('./objects/index.js');

function canvasFill() {
  gameArea.fill();
  components.player.canvasFill(gameArea.canvasContext);
  components.enemies.canvasFill(gameArea);
  components.bullets.canvasFill(gameArea);
  components.powerUps.canvasFill(gameArea);
}

function update() {
  let timeCurrent;
  let timePrevious = 0;
  let timeElapsed;

  function requestAnimationFrameLoop(timeStamp) {
    timeCurrent = timeStamp || 20; // timeStamp is undefined until requestAnimationFrame runs
    timeElapsed = timeCurrent - timePrevious;
    timePrevious = timeCurrent;

    components.player.update(timeElapsed, gameArea.canvas, components.keyMap, components);
    components.enemies.update(timeElapsed, 0, 1366, components, Objects.Enemy);
    components.bullets.update(timeElapsed, 0, components, Objects.Bullet, gameArea.canvas);
    components.powerUps.update(timeElapsed, components, Objects.PowerUp, gameArea);
    canvasFill();
    window.requestAnimationFrame(requestAnimationFrameLoop);
  }
  requestAnimationFrameLoop(timeElapsed, timePrevious);
}

window.onload = () => {
  gameArea.start(components);
  update();
  events.listen(gameArea.canvas, components, Objects.Bullet, components.keyMap);
};
