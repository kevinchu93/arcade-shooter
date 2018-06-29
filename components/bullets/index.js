module.exports = {
  head: null,
  canvasFill(gameArea) {
    for (let i = this.head; i != null; i = i.nextBullet) {
      i.canvasFill(gameArea.canvasElementDrawingContext);
    }
  },
  update(timeElapsed, boundary, components, Bullet, keyMap, OrangeRed, DeepSkyBlue) {
    if (keyMap[13] === true) {
      const bullet = this.createNew(components, Bullet, OrangeRed, DeepSkyBlue);
      this.appendNewBullet(bullet, components);
    }
    for (let i = this.head; i != null; i = i.nextBullet) {
      i.update(timeElapsed, boundary, components, Bullet);
    }
  },
  createNew(components, Bullet, OrangeRed, DeepSkyBlue) {
    let bullet = {};
    switch (components.player.bulletType) {
      case 'white':
        bullet = new Bullet(components.player);
        break;
      case 'orangered':
        bullet = new OrangeRed(components.player);
        break;
      case 'deepskyblue':
        bullet = new DeepSkyBlue(components.player);
        break;
      default:
        bullet = new Bullet(components.player);
    }
    return bullet;
  },
  appendNewBullet(bullet, components) {
    components.bullets.head = bullet.append(components.bullets.head);
  },
};
