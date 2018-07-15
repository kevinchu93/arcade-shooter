const blue = require('./blue.js');
const red = require('./red.js');
const purple = require('./purple.js');
const Bullet = require('../objects/bullet/index.js');

module.exports = {
  bulletCount: 0,
  bulletCountPurple: 0,
  head: null,
  draw(game) {
    for (let i = this.head; i != null; i = i.nextBullet) {
      i.draw();
    }
    game.canvasContext.fillText(this.bulletCountPurple, 400, 55);
  },
  update(game) {
    if (game.keyMap[13] === true) {
      this.create(game);
    }
    for (let i = this.head; i != null; i = i.nextBullet) {
      i.update();
    }
  },
  create(game) {
    let bullet = {};
    switch (game.player.bulletType) {
      case 'white':
        this.head = new Bullet.Default(game).append();
        break;
      case 'orangered': {
        const bulletArray = red.createRed(game);
        for (let i = 0; bulletArray[i] != null; i += 1) {
          this.head = bulletArray[i].append();
        }
        break;
      }
      case 'deepskyblue':
        this.head = blue.createBlue(game).append();
        break;
      case 'mediumpurple':
        bullet = purple.createPurple(game);
        if (bullet != null) {
          this.head = bullet.append();
        }
        break;
      default:
        this.head = new Bullet.Default(game).append();
    }
  },
};
