module.exports = {
  head: null,
  canvasFill(gameArea) {
    for (let i = this.head; i != null; i = i.nextBullet) {
      i.canvasFill(gameArea.canvasElementDrawingContext);
    }
  },
  update(timeElapsed, boundary, components, Bullet, keyMap) {
    if (keyMap[13] === true) {
      const bullet = this.createNew(components, Bullet);
      this.appendNewBullet(bullet, components);
    }
    for (let i = this.head; i != null; i = i.nextBullet) {
      i.update(timeElapsed, boundary, components, Bullet);
    }
  },
  createNew(components, Bullet) {
    let bullet = {};
    switch (components.player.bulletType) {
      case 'white':
        bullet = new Bullet.Default(components.player);
        break;
      case 'orangered':
        bullet = new Bullet.Red(components.player);
        break;
      case 'deepskyblue':
        bullet = new Bullet.Blue(components.player);
        break;
      default:
        bullet = new Bullet.Default(components.player);
    }
    return bullet;
  },
  appendNewBullet(bullet, components) {
    components.bullets.head = bullet.append(components.bullets.head);
  },
};
