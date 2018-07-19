const Timer = require('./timer.js');
const bullets = require('./bullets/index.js');
const enemies = require('./enemies/index.js');
const powerUps = require('./powerUps/index.js');
const Player = require('./objects/player/index.js');
const players = require('./players/index.js');

module.exports = {
  keyMap: [],
  bullets,
  enemies,
  powerUps,
  players,
  canvas: null,
  gameState: null,
  init() {
    this.timer = new Timer();
    this.canvas.width = 1366;
    this.canvas.height = 768;
    this.canvas.tabIndex = 1000;
    this.canvas.focus();
    this.canvasContext = this.canvas.getContext('2d');
    this.player = new Player(this);
  },
  serverInit() {
    this.timer = new Timer();
    this.canvas = {};
    this.canvas.width = 1366;
    this.canvas.height = 768;
  },
  clientInit() {
    this.timer = new Timer();
    this.canvas.width = 1366;
    this.canvas.height = 768;
    this.canvas.tabIndex = 1000;
    this.canvas.focus();
    this.canvasContext = this.canvas.getContext('2d');
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
  serverStart() {
    setInterval(() => {
      this.timer.tick();
      this.update();
      this.spawn();
    }, 1000 / 60);
  },
  clientStart() {
    const gameLoop = () => {
      this.clientDraw();
      window.requestAnimationFrame(gameLoop);
    };
    gameLoop();
  },
  clientDraw() {
    this.drawBackground();
    if (this.gameState != null) {
      this.players.draw(this, this.gameState);
      this.enemies.draw(this, this.gameState);
      this.powerUps.draw(this, this.gameState);
      this.bullets.draw(this, this.gameState);
    }
  },
  drawBackground() {
    this.canvasContext.font = 'bold 48px Arial, sans-serif';
    this.canvasContext.fillStyle = 'black';
    this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasContext.fillStyle = 'white';
  },
  update() {
    this.players.update();
    this.enemies.update();
    this.bullets.update(this);
    this.powerUps.update();
  },
  draw() {
    this.drawBackground();
    Object.keys(this.players).forEach((key) => {
      this.players[key].draw();
    });
    this.enemies.draw(this);
    this.bullets.draw(this);
    this.powerUps.draw();
  },
  spawn() {
    this.enemies.spawn(this);
    this.powerUps.spawn(this);
  },
};
