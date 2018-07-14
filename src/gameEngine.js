const Timer = require('./timer.js');
const bullets = require('./bullets/index.js');
const enemies = require('./enemies/index.js');
const powerUps = require('./powerUps/index.js');
const Bullet = require('./objects/bullet/default.js');
const Enemy = require('./objects/enemy/index.js');
const PowerUp = require('./objects/powerUp/index.js');

module.exports = {
  keyMap: [],
  bullets,
  enemies,
  powerUps,
  player: null,
  canvas: document.getElementById('canvas'),
  init(components, Player) {
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
    }
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
    this.enemies.spawn.countdown -= this.timer.deltaTime;
    if (this.enemies.spawn.countdown <= 0) {
      this.enemies.spawn.countdown += this.enemies.spawn.rate;
      const enemy = new Enemy(this);
      this.enemies.head = enemy.append();
    }

    this.powerUps.config.spawn.countdown -= this.timer.deltaTime;
    if (this.powerUps.config.spawn.countdown <= 0) {
      this.powerUps.config.spawn.countdown += this.powerUps.config.spawn.randomRate();
      const powerUp = this.powerUps.create(PowerUp, this);
      this.powerUps.head = powerUp.append();
    }
  },
};
