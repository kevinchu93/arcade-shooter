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
        bullet = new Bullet.Default(game);
        this.appendList(bullet);
        break;
      case 'orangered': {
        const bulletArray = red.createRed(game, emptyArray);
        for (let i = 0; bulletArray[i] != null; i += 1) {
          this.appendList(bulletArray[i], game);
        }
        break;
      }
      case 'deepskyblue':
        console.log('deepskyblue');
        bullet = blue.createBlue(game);
        console.log(bullet);
        this.appendList(bullet);
        break;
      case 'mediumpurple':
        bullet = purple.createPurple(game);
        if (bullet != null) {
          this.appendList(bullet);
        }
        break;
      default:
        bullet = new Bullet.Default(game.player, game);
        this.appendList(bullet);
    }
  },
  appendList(bullet) {
    this.head = bullet.append();
  },
};
