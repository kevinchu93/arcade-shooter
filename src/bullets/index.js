const blue = require('./blue.js');
const red = require('./red.js');
const purple = require('./purple.js');
const Bullet = require('../objects/bullet/index.js');

const Player = require('../objects/player/index.js');
const Enemy = require('../objects/enemy/index.js');

module.exports = class {
  constructor(game) {
    this.game = game;
    this.entities = [];
    this.bulletCount = 0;
    this.bulletCountPurple = 0;
    this.head = null;
  }
  draw() {
    for (let i = 0; this.game.bullets.entities[i] != null; i += 1) {
      if (this.game.bullets.entities[i].type !== 'mediumpurple') {
        this.game.canvasContext.fillStyle = this.game.bullets.entities[i].type;
        this.game.canvasContext.fillRect(
          this.game.bullets.entities[i].positionX,
          this.game.bullets.entities[i].positionY,
          this.game.bullets.entities[i].width,
          this.game.bullets.entities[i].height,
        );
      } else if (this.game.bullets.entities[i].type === 'mediumpurple') {
        this.game.canvasContext.strokeStyle = 'mediumpurple';
        this.game.canvasContext.lineWidth = 2;
        this.game.canvasContext.lineCap = 'round';
        this.game.canvasContext.beginPath();
        this.game.canvasContext.moveTo(
          this.game.bullets.entities[i].positionX,
          this.game.bullets.entities[i].positionY,
        );
        this.game.canvasContext.quadraticCurveTo(
          this.game.bullets.entities[i].controlPositionX,
          this.game.bullets.entities[i].controlPositionY,
          this.game.bullets.entities[i].enemyPositionX,
          this.game.bullets.entities[i].enemyPositionY,
        );
        this.game.canvasContext.stroke();
      }
    }
  }
  update(time) {
    for (let i = this.entities.length - 1; i >= 0; i -= 1) {
      if (this.entities[i].removeFromGame === true) {
        if (this.entities[i].type === 'mediumpurple') {
          this.bulletCountPurple -= 1;
        }
        this.entities.splice(i, 1);
      }
    }
    for (let i = 0; i < this.entities.length; i += 1) {
      this.entities[i].update(time);
    }
  }
  addBullet(bullet) {
    this.entities.push(bullet);
    if (bullet.type === 'mediumpurple') {
      this.bulletCountPurple += 1;
    }
  }
  create(player) {
    let bulletArray = [];
    switch (player.bulletType) {
      case 'white':
        bulletArray[0] = new Bullet.Default(this.game, player);
        this.addBullet(bulletArray[0]);
        break;
      case 'orangered': {
        bulletArray = red.createRed(this.game, player);
        for (let i = 0; bulletArray[i] != null; i += 1) {
          this.addBullet(bulletArray[i]);
        }
        break;
      }
      case 'deepskyblue':
        bulletArray[0] = blue.createBlue(this.game, player);
        this.addBullet(bulletArray[0]);
        break;
      case 'mediumpurple':
        bulletArray[0] = purple.createPurple(this.game, player);
        if (bulletArray[0] != null) {
          this.addBullet(bulletArray[0]);
        }
        break;
      default:
        bulletArray[0] = new Bullet.Default(this.game, player);
        this.addBullet(bulletArray[0]);
    }
    return bulletArray;
  }
  getState() {
    const state = [];
    for (let i = 0; i < this.entities.length; i += 1) {
      state.push(this.entities[i].getState());
    }
    return state;
  }
  updateWithServerState() {
    this.entities = [];
    for (let i = 0; this.game.serverState.bullets.entities[i] != null; i += 1) {
      switch (this.game.serverState.bullets.entities[i].type) {
        case 'white': {
          const player = new Player(this.game, 'id');
          const bulletDefault = new Bullet.Default(this.game, player);
          Object.keys(this.game.serverState.bullets.entities[i]).forEach((key) => {
            bulletDefault[key] = this.game.serverState.bullets.entities[i][key];
          });
          this.entities[i] = bulletDefault;
          break;
        }
        case 'orangered': {
          const player = new Player(this.game, 'id');
          const bulletRed = new Bullet.Red(this.game, player, 10);
          Object.keys(this.game.serverState.bullets.entities[i]).forEach((key) => {
            bulletRed[key] = this.game.serverState.bullets.entities[i][key];
          });
          this.entities[i] = bulletRed;
          break;
        }
        case 'deepskyblue': {
          const player = new Player(this.game, 'id');
          const bulletBlue = new Bullet.Blue(this.game, player, 10, 10);
          Object.keys(this.game.serverState.bullets.entities[i]).forEach((key) => {
            bulletBlue[key] = this.game.serverState.bullets.entities[i][key];
          });
          this.entities[i] = bulletBlue;
          break;
        }
        case 'mediumpurple': {
          const player = new Player(this.game, 'id');
          const enemy = new Enemy(this.game);
          const bulletPurple = new Bullet.Purple(this.game, player, enemy);
          Object.keys(this.game.serverState.bullets.entities[i]).forEach((key) => {
            bulletPurple[key] = this.game.serverState.bullets.entities[i][key];
          });
          const targetEnemy = this.game.enemies.entities.find(obj => (
            obj.id === bulletPurple.enemyId
          ));
          const targetPlayer = this.game.players.entities[bulletPurple.playerId];
          bulletPurple.targetEnemy = targetEnemy;
          bulletPurple.targetPlayer = targetPlayer;
          this.entities[i] = bulletPurple;
          break;
        }
        default: {
          const player = new Player(this.game, 'id');
          const bulletDefault = new Bullet.Default(this.game, player);
          Object.keys(this.game.serverState.bullets.entities[i]).forEach((key) => {
            bulletDefault[key] = this.game.serverState.bullets.entities[i][key];
          });
          this.entities[i] = bulletDefault;
        }
      }
    }
  }
};
