const Player = require('./objects/player/index.js');
const Enemy = require('./objects/enemy/index.js');

module.exports = {
  canvasElement: document.getElementById('canvas'),
  start(components) {
    this.canvasElement.width = 1366;
    this.canvasElement.height = 768;
    this.canvasElement.tabIndex = 1000;
    this.canvasElementDrawingContext = this.canvasElement.getContext('2d');
    components.player = new Player(this.canvasElement.width, this.canvasElement.height);
    const enemy = new Enemy(Enemy.getDefaultSpec());
    components.enemies.head = enemy.append(components.enemies.head);
  },
  fill() {
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
  powerUpSpawnCountdown: 1000,
};
