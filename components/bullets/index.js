const config = require('./config.js');
const createBlue = require('./createBlue.js');
const createRed = require('./createRed.js');
const createPurple = require('./createPurple.js');

module.exports = {
  config,
  bulletCount: 0,
  bulletCountPurple: 0,
  head: null,
  canvasFill(gameArea) {
    for (let i = this.head; i != null; i = i.nextBullet) {
      i.canvasFill(gameArea.canvasElementDrawingContext);
    }
    gameArea.canvasElementDrawingContext.fillText(this.bulletCountPurple, 400, 55);
  },
  update(timeElapsed, boundary, components, Bullet, keyMap, drawingContext) {
    if (keyMap[13] === true) {
      this.createNewBullet(components, Bullet);
    }
    for (let i = this.head; i != null; i = i.nextBullet) {
      i.update(timeElapsed, boundary, components, Bullet, drawingContext);
    }
  },
  createNewBullet(components, Bullet) {
    let bullet = {};
    switch (components.player.bulletType) {
      case 'white':
        bullet = new Bullet.Default(components.player);
        this.appendNewBullet(bullet, components);
        break;
      case 'orangered': {
        const emptyArray = [];
        const bulletArray = createRed(components.player, Bullet, emptyArray);
        for (let i = 0; bulletArray[i] != null; i += 1) {
          this.appendNewBullet(bulletArray[i], components);
        }
        break;
      }
      case 'deepskyblue':
        bullet = createBlue(components.player, Bullet);
        this.appendNewBullet(bullet, components);
        break;
      case 'mediumpurple':
        bullet = createPurple(components, Bullet);
        if (bullet != null) {
          this.appendNewBullet(bullet, components);
        }
        break;
      default:
        bullet = new Bullet.Default(components.player);
        this.appendNewBullet(bullet, components);
    }
  },
  appendNewBullet(bullet, components) {
    components.bullets.head = bullet.append(components.bullets.head, components.bullets);
  },
};
