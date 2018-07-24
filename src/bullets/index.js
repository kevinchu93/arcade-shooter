const blue = require('./blue.js');
const red = require('./red.js');
const purple = require('./purple.js');
const Bullet = require('../objects/bullet/index.js');

module.exports = class {
  constructor() {
    this.entities = [];
    this.bulletCount = 0;
    this.bulletCountPurple = 0;
    this.head = null;
  }
  drawDepreciate(game) {
    for (let i = this.head; i != null; i = i.nextBullet) {
      i.draw();
    }
    game.canvasContext.fillText(this.bulletCountPurple, 400, 55);
  }
  draw(game, gameState) {
    for (let i = 0; gameState.bullets.entities[i] != null; i += 1) {
      if (gameState.bullets.entities[i].type !== 'mediumpurple') {
        game.canvasContext.fillStyle = gameState.bullets.entities[i].type;
        game.canvasContext.fillRect(
          game.gameState.bullets.entities[i].positionX,
          game.gameState.bullets.entities[i].positionY,
          game.gameState.bullets.entities[i].width,
          game.gameState.bullets.entities[i].height,
        );
      } else if (gameState.bullets.entities[i].type === 'mediumpurple') {
        game.canvasContext.strokeStyle = 'mediumpurple';
        game.canvasContext.lineWidth = 2;
        game.canvasContext.lineCap = 'round';
        game.canvasContext.beginPath();
        game.canvasContext.moveTo(
          gameState.bullets.entities[i].positionX,
          gameState.bullets.entities[i].positionY,
        );
        game.canvasContext.quadraticCurveTo(
          gameState.bullets.entities[i].controlPositionX,
          gameState.bullets.entities[i].controlPositionY,
          gameState.bullets.entities[i].enemyPositionX,
          gameState.bullets.entities[i].enemyPositionY,
        );
        game.canvasContext.stroke();
      }
    }
  }
  update() {
    for (let i = this.entities.length - 1; i >= 0; i -= 1) {
      if (this.entities[i].removeFromGame === true) {
        this.entities.splice(i, 1);
        this.bulletCountPurple -= 1;
      }
    }
    for (let i = 0; i < this.entities.length; i += 1) {
      this.entities[i].update();
    }
  }
  addBullet(bullet) {
    this.entities.push(bullet);
    this.bulletCountPurple += 1;
  }
  create(game, player) {
    let bulletArray = [];
    switch (player.bulletType) {
      case 'white':
        bulletArray[0] = new Bullet.Default(game, player);
        this.addBullet(bulletArray[0]);
        break;
      case 'orangered': {
        bulletArray = red.createRed(game, player);
        for (let i = 0; bulletArray[i] != null; i += 1) {
          this.addBullet(bulletArray[i]);
        }
        break;
      }
      case 'deepskyblue':
        bulletArray[0] = blue.createBlue(game, player);
        this.addBullet(bulletArray[0]);
        break;
      case 'mediumpurple':
        bulletArray[0] = purple.createPurple(game, player);
        if (bulletArray[0] != null) {
          this.addBullet(bulletArray[0]);
        }
        break;
      default:
        bulletArray[0] = new Bullet.Default(game, player);
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
};
