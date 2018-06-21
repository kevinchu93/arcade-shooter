const Bullet = require('./bullet.js');
const Player = require('./player.js');
const Event = require('./event.js');
const Enemy = require('./enemy.js');

const head = {
  value: null,
};

const components = {
  bulletHead: null,
  player: new Player(Player.getDefaultSpec()),
  enemy: new Enemy(Enemy.getDefaultSpec()),
};

const gameArea = {
  canvasElement: document.getElementById('canvas'),
  start: function () {
    this.canvasElement.width = 1366;
    this.canvasElement.height = 768;
    this.canvasElementDrawingContext = this.canvasElement.getContext('2d');
  },
  fill: function () {
    this.canvasElementDrawingContext.font = 'bold 48px Arial, sans-serif';
    this.canvasElementDrawingContext.fillStyle = 'black';
    this.canvasElementDrawingContext.fillRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height,
    );
    this.canvasElementDrawingContext.fillStyle = 'white';
  },
};

function canvasFill(components) {
  gameArea.fill();
  components.player.canvasFill(gameArea.canvasElementDrawingContext);
  components.enemy.canvasFill(gameArea.canvasElementDrawingContext);
  for (let i = components.bulletHead; i != null; i = i.next) {
    i.canvasFill(gameArea.canvasElementDrawingContext);
  }
}

function update(components, gameArea) {
  let timeElapsed;
  let timePrevious = 0;

  function requestAnimationFrameLoop(timeStamp) {
    timeStamp = timeStamp || 20;    // timeStamp is undefined until window.requestAnimationFrame runs
    timeElapsed = timeStamp - timePrevious;
    timePrevious = timeStamp;
    for (let i = components.bulletHead; i != null; i = i.next) {
      i.update(timeElapsed, 0, components, Bullet);
    }

    components.enemy.update(timeElapsed, 0, 1366);
    canvasFill(components);
    window.requestAnimationFrame(requestAnimationFrameLoop);
  }
  requestAnimationFrameLoop(timeElapsed, timePrevious);
}

window.onload = () => {
  gameArea.start();
  update(components, gameArea);
  Event.mouseMove(gameArea.canvasElement, components.player);
  Event.click(gameArea.canvasElement, Bullet, components, components.player);
};
