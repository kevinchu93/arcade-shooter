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
  player2: null,
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
      this.spawn()
    }, 1000/60)
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
      if (this.gameState.player != null) {
        this.canvasContext.fillRect(
          this.gameState.player.positionX,
          this.gameState.player.positionY,
          30,
          20,
        );
      }
      if (this.gameState.player2 != null) {
        this.canvasContext.fillRect(
          this.gameState.player2.positionX,
          this.gameState.player2.positionY,
          30,
          20,
        );
      }
      for (let i = 0; this.gameState.enemies[i] != null; i += 1) {
        this.canvasContext.fillRect(
          this.gameState.enemies[i].positionX,
          this.gameState.enemies[i].positionY,
          20,
          10,
        );
      }
      for (let i = 0; this.gameState.bullets[i] != null; i += 1) {
        console.log(this.gameState.bullets[i].type);
        if (this.gameState.bullets[i].type != 'mediumpurple') {
          this.canvasContext.fillStyle = this.gameState.bullets[i].type;
          this.canvasContext.fillRect(
            this.gameState.bullets[i].positionX,
            this.gameState.bullets[i].positionY,
            this.gameState.bullets[i].width,
            this.gameState.bullets[i].height,
          );
        } else {
          this.canvasContext.strokeStyle = 'mediumpurple';
          this.canvasContext.lineWidth = 2;
          this.canvasContext.lineCap = 'round';
          this.canvasContext.beginPath();
          this.canvasContext.moveTo(this.gameState.bullets[i].positionX, this.gameState.bullets[i].positionY);
          this.canvasContext.quadraticCurveTo(
            this.gameState.bullets[i].controlPositionX, this.gameState.bullets[i].controlPositionY,
            this.gameState.bullets[i].enemyPositionX, this.gameState.bullets[i].enemyPositionY,
          );
          this.canvasContext.stroke();
        }
      }
      for (let i = 0; this.gameState.powerUps[i] != null; i += 1) {
        this.canvasContext.fillStyle = this.gameState.powerUps[i].color;
        this.canvasContext.beginPath();
        this.canvasContext.arc(
          this.gameState.powerUps[i].positionX,
          this.gameState.powerUps[i].positionY,
          5,
          0,
          2 * Math.PI
        );
        this.canvasContext.fill();
      }
    }
  },
  drawBackground() {
    this.canvasContext.font = 'bold 48px Arial, sans-serif';
    this.canvasContext.fillStyle = 'black';
    this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasContext.fillStyle = 'white';
  },
  update() {
    if (this.player !== null) {
      this.player.update();
    }
    if (this.player2 !== null) {
      this.player2.update();
    }
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
