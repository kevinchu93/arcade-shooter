const blue = require('./blue.js');
const red = require('./red.js');
const purple = require('./purple.js');
const Bullet = require('../objects/bullet/index.js');

module.exports = {
  bulletCount: 0,
  bulletCountPurple: 0,
  head: null,
  drawDepreciate(game) {
    for (let i = this.head; i != null; i = i.nextBullet) {
      i.draw();
    }
    game.canvasContext.fillText(this.bulletCountPurple, 400, 55);
  },
  draw(game, gameState) {
    for (let i = 0; gameState.bullets[i] != null; i += 1) {
      if (gameState.bullets[i].type !== 'mediumpurple') {
        game.canvasContext.fillStyle = gameState.bullets[i].type;
        game.canvasContext.fillRect(
          game.gameState.bullets[i].positionX,
          game.gameState.bullets[i].positionY,
          game.gameState.bullets[i].width,
          game.gameState.bullets[i].height,
        );
      } else if (gameState.bullets[i].type === 'mediumpurple') {
        game.canvasContext.strokeStyle = 'mediumpurple';
        game.canvasContext.lineWidth = 2;
        game.canvasContext.lineCap = 'round';
        game.canvasContext.beginPath();
        game.canvasContext.moveTo(
          gameState.bullets[i].positionX,
          gameState.bullets[i].positionY,
        );
        game.canvasContext.quadraticCurveTo(
          gameState.bullets[i].controlPositionX, gameState.bullets[i].controlPositionY,
          gameState.bullets[i].enemyPositionX, gameState.bullets[i].enemyPositionY,
        );
        game.canvasContext.stroke();
      }
    }
  },
  update() {
    for (let i = this.head; i != null; i = i.nextBullet) {
      i.update();
    }
  },
  create(game, player) {
    let bullet = {};
    switch (player.bulletType) {
      case 'white':
        this.head = new Bullet.Default(game, player).append();
        break;
      case 'orangered': {
        const bulletArray = red.createRed(game, player);
        for (let i = 0; bulletArray[i] != null; i += 1) {
          this.head = bulletArray[i].append();
        }
        break;
      }
      case 'deepskyblue':
        this.head = blue.createBlue(game, player).append();
        break;
      case 'mediumpurple':
        bullet = purple.createPurple(game, player);
        if (bullet != null) {
          this.head = bullet.append();
        }
        break;
      default:
        this.head = new Bullet.Default(game, player).append();
    }
  },
  getState(gameServer) {
    for (let i = this.head; i != null; i = i.nextBullet) {
      gameServer.gameState.bullets.push(i.getState());
    }
  },
};
