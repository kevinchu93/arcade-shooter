const Timer = require('./timer.js');
const Bullets = require('./bullets/index.js');
const Enemies = require('./enemies/index.js');
const PowerUps = require('./powerUps/index.js');
const Players = require('./players/index.js');

module.exports = class {
  constructor() {
    this.bullets = new Bullets(this);
    this.enemies = new Enemies(this);
    this.powerUps = new PowerUps(this);
    this.players = new Players(this);
    this.canvas = null;
  }
  init() {
    this.timer = new Timer();
    this.canvas.width = 1366;
    this.canvas.height = 768;
  }
  spawn() {
    this.enemies.spawn();
    this.powerUps.spawn();
  }
};
