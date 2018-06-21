const Bullet = require('./bullet.js');
const Player = require('./player.js');
const Event = require('./event.js');
const Enemy = require('./enemy.js');

const components = {
  bulletHead: null,
  player: null,
  enemyHead: null,
};

const gameArea = {
  canvasElement: document.getElementById('canvas'),
  start: function (components) {
    this.canvasElement.width = 1366;
    this.canvasElement.height = 768;
    this.canvasElementDrawingContext = this.canvasElement.getContext('2d');
    components.player = new Player(Player.getDefaultSpec(this.canvasElement.width, this.canvasElement.height));
    let enemy = new Enemy(Enemy.getDefaultSpec());
    components.enemyHead = enemy.append(components.enemyHead);
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
  enemySpawnCountdown: 1000,
};

function canvasFill(components) {
  gameArea.fill();
  components.player.canvasFill(gameArea.canvasElementDrawingContext);
  for (let i = components.enemyHead; i != null; i = i.next) {
    i.canvasFill(gameArea.canvasElementDrawingContext);
  }
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

    gameArea.enemySpawnCountdown -= timeElapsed;
    if (gameArea.enemySpawnCountdown <= 0) {
      let enemy = new Enemy(Enemy.getDefaultSpec());
      components.enemyHead = enemy.append(components.enemyHead);
      gameArea.enemySpawnCountdown += 1000;
    }
    for (let i = components.bulletHead; i != null; i = i.next) {
      i.update(timeElapsed, 0, components, Bullet);
    }
    for (let i = components.enemyHead; i != null; i = i.next) {
      i.update(timeElapsed, 0, 1366, components);
    }
    canvasFill(components);
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
