const Timer = require('./timer.js');
const bullets = require('./bullets/index.js');
const enemies = require('./enemies/index.js');
const powerUps = require('./powerUps/index.js');
const Player = require('./objects/player/index.js');

module.exports = {
  keyMap: [],
  bullets,
  enemies,
  powerUps,
  player: null,
  canvas: document.getElementById('canvas'),
  init() {
    this.timer = new Timer();
    this.canvas.width = 1366;
    this.canvas.height = 768;
    this.canvas.tabIndex = 1000;
    this.canvas.focus();
    this.canvasContext = this.canvas.getContext('2d');
    this.player = new Player(this);
  },
  start() {
    const gameLoop = () => {
      this.timer.tick();
      this.update();
      this.draw();
      this.spawn();
      window.requestAnimationFrame(gameLoop);
    };
    gameLoop();
  },
  drawBackground() {
    this.canvasContext.font = 'bold 48px Arial, sans-serif';
    this.canvasContext.fillStyle = 'black';
    this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasContext.fillStyle = 'white';
  },
  update() {
    this.player.update();
    this.enemies.update();
    this.bullets.update(this);
    this.powerUps.update();
  },
  draw() {
    this.drawBackground();
    this.player.draw();
    this.enemies.draw(this);
    this.bullets.draw(this);
    this.powerUps.draw();
  },
  spawn() {
    this.enemies.spawn(this);
    this.powerUps.spawn(this);
  },
};
