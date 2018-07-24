const Timer = require('./timer.js');
const Bullets = require('./bullets/index.js');
const Enemies = require('./enemies/index.js');
const PowerUps = require('./powerUps/index.js');
const Player = require('./objects/player/index.js');
const Players = require('./players/index.js');
const Enemy = require('./objects/enemy/index.js');
const PowerUp = require('./objects/powerUp/index.js');
const Bullet = require('./objects/bullet/index.js');

module.exports = class {
  constructor() {
    this.client_input = {
      keyMap: [],
      history: [],
      sequence: 0,
      deltaTime: [],
    };
    this.applyState = false;
    this.bullets = new Bullets();
    this.enemies = new Enemies();
    this.powerUps = new PowerUps();
    this.players = new Players();
    this.canvas = null;
    this.gameState = null;
  }
  init() {
    this.timer = new Timer();
    this.canvas.width = 1366;
    this.canvas.height = 768;
    this.canvas.tabIndex = 1000;
    this.canvas.focus();
    this.canvasContext = this.canvas.getContext('2d');
    this.player = new Player(this);
  }
  server_init() {
    this.timer = new Timer();
    this.canvas = {};
    this.canvas.width = 1366;
    this.canvas.height = 768;
  }
  client_init() {
    this.timer = new Timer();
    this.canvas.width = 1366;
    this.canvas.height = 768;
    this.canvas.tabIndex = 1000;
    this.canvas.focus();
    this.canvasContext = this.canvas.getContext('2d');
  }
  start() {
    const gameLoop = () => {
      this.timer.tick();
      this.update();
      this.draw();
      this.spawn();
      window.requestAnimationFrame(gameLoop);
    };
    gameLoop();
  }
  // starts server update loop
  server_start() {
    setInterval(() => {
      this.timer.tick();
      this.update();
      this.spawn();
    }, 1000 / 60);
  }
  client_start(socket) {
    const gameLoop = () => {
      this.client_input.sequence += 1;
      this.sendInput(socket);
      // save delta time of this input sequence
      this.client_input.deltaTime[this.client_input.sequence] = this.timer.tick();
      // save input sequence
      this.client_input.history[this.client_inputSequence] = this.client_input.keyMap;

      this.client_updateWithState();
      // this.client_draw();
      this.client_drawOwnState();
      window.requestAnimationFrame(gameLoop);
    };
    gameLoop();
  }
  // use server gameState to recreate all entities, not sure if most efficient method
  client_updateWithState() {
    // if server state has not yet been applied
    if (this.applyState === true) {
      // create dummy entities to obtain templates with class methods
      const player = new Player(this, 'id');

      this.players.entities = {};
      Object.keys(this.gameState.players.entities).forEach((id) => {
        this.players.entities[id] = new Player(this, id);
        Object.keys(this.gameState.players.entities[id]).forEach((key) => {
          this.players.entities[id][key] = this.gameState.players.entities[id][key];
        });
      });

      this.enemies.entities = [];
      for (let i = 0; this.gameState.enemies.entities[i] != null; i += 1) {
        // create new Enemy instance, to avoid using the same enemy object reference
        const enemy = new Enemy(this);
        Object.keys(this.gameState.enemies.entities[i]).forEach((key) => {
          enemy[key] = this.gameState.enemies.entities[i][key];
        });
        this.enemies.entities[i] = enemy;
      }

      this.powerUps.entities = [];
      for (let i = 0; this.gameState.powerUps.entities[i] != null; i += 1) {
        const powerUp = new PowerUp(this);
        Object.keys(this.gameState.powerUps.entities[i]).forEach((key) => {
          powerUp[key] = this.gameState.powerUps.entities[i][key];
        });
        this.powerUps.entities[i] = powerUp;
      }

      this.bullets.entities = [];
      for (let i = 0; this.gameState.bullets.entities[i] != null; i += 1) {
        switch (this.gameState.bullets.entities[i].type) {
          case 'white': {
            const bulletDefault = new Bullet.Default(this, player);
            Object.keys(this.gameState.bullets.entities[i]).forEach((key) => {
              bulletDefault[key] = this.gameState.bullets.entities[i][key];
            });
            this.bullets.entities[i] = bulletDefault;
            break;
          }
          case 'orangered': {
            const bulletRed = new Bullet.Red(this, player, 10);
            Object.keys(this.gameState.bullets.entities[i]).forEach((key) => {
              bulletRed[key] = this.gameState.bullets.entities[i][key];
            });
            this.bullets.entities[i] = bulletRed;
            break;
          }
          case 'deepskyblue': {
            const bulletBlue = new Bullet.Blue(this, player, 10, 10);
            Object.keys(this.gameState.bullets.entities[i]).forEach((key) => {
              bulletBlue[key] = this.gameState.bullets.entities[i][key];
            });
            this.bullets.entities[i] = bulletBlue;
            break;
          }
          case 'mediumpurple': {
            const enemy = new Enemy(this);
            const bulletPurple = new Bullet.Purple(this, player, enemy);
            Object.keys(this.gameState.bullets.entities[i]).forEach((key) => {
              bulletPurple[key] = this.gameState.bullets.entities[i][key];
            });
            this.bullets.entities[i] = bulletPurple;
            break;
          }
          default: {
            const bulletDefault = new Bullet.Default(this, player);
            Object.keys(this.gameState.bullets.entities[i]).forEach((key) => {
              bulletDefault[key] = this.gameState.bullets.entities[i][key];
            });
            this.bullets.entities[i] = bulletDefault;
          }
        }
      }

      this.applyState = false;
    }
  }
  sendInput(socket) {
    socket.emit('input', {
      keyMap: this.client_input.keyMap,
      sequence: this.client_input.sequence,
    });
  }
  client_draw() {
    this.drawBackground();
    if (this.gameState != null) {
      this.players.draw(this, this.gameState);
      this.enemies.draw(this, this.gameState);
      this.powerUps.draw(this, this.gameState);
      this.bullets.draw(this, this.gameState);
    }
  }
  client_drawOwnState() {
    this.drawBackground();
    this.players.draw(this, this);
    this.enemies.draw(this, this);
    this.powerUps.draw(this, this);
    this.bullets.draw(this, this);
  }
  drawBackground() {
    this.canvasContext.font = 'bold 48px Arial, sans-serif';
    this.canvasContext.fillStyle = 'black';
    this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasContext.fillStyle = 'white';
  }
  update() {
    this.players.update();
    this.enemies.update();
    this.bullets.update(this);
    this.powerUps.update();
  }
  draw() {
    this.drawBackground();
    Object.keys(this.players).forEach((key) => {
      this.players[key].draw();
    });
    this.enemies.draw(this);
    this.bullets.draw(this);
    this.powerUps.draw();
  }
  spawn() {
    this.enemies.spawn(this);
    this.powerUps.spawn(this);
  }
};
