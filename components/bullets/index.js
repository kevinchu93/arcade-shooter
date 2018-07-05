const config = require('./config.js');
const blue = require('./blue.js');
const red = require('./red.js');
const purple = require('./purple.js');

module.exports = {
  config,
  bulletCount: 0,
  bulletCountPurple: 0,
  head: null,
  canvasFill(gameArea) {
    for (let i = this.head; i != null; i = i.nextBullet) {
      i.canvasFill(gameArea.canvasContext);
    }
    gameArea.canvasContext.fillText(this.bulletCountPurple, 400, 55);
  },
  update(time, boundary, components, Bullet, canvas) {
    if (components.keyMap[13] === true) {
      this.create(components, Bullet, canvas);
    }
    for (let i = this.head; i != null; i = i.nextBullet) {
      i.update(time, boundary, components, Bullet);
    }
  },
  create(components, Bullet, canvas) {
    let bullet = {};
    switch (components.player.bulletType) {
      case 'white':
        bullet = new Bullet.Default(components.player);
        this.appendList(bullet, components);
        break;
      case 'orangered': {
        const emptyArray = [];
        const bulletArray = red.createRed(components.player, Bullet, emptyArray);
        for (let i = 0; bulletArray[i] != null; i += 1) {
          this.appendList(bulletArray[i], components);
        }
        break;
      }
      case 'deepskyblue':
        bullet = blue.createBlue(components.player, Bullet);
        this.appendList(bullet, components);
        break;
      case 'mediumpurple':
        bullet = purple.createPurple(components, Bullet, canvas);
        if (bullet != null) {
          this.appendList(bullet, components);
        }
        break;
      default:
        bullet = new Bullet.Default(components.player);
        this.appendList(bullet, components);
    }
  },
  appendList(bullet, components) {
    components.bullets.head = bullet.append(components.bullets.head, components.bullets);
  },
};
