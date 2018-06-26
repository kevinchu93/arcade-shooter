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
    const bullet = new Bullet(Bullet.getDefaultSpec());
    bullet.positionHorizontal =
      components.player.positionHorizontal + ((components.player.width - bullet.width) / 2);
    bullet.positionVertical = components.player.positionVertical;
    return bullet;
  },
  appendNewBullet(bullet, components) {
    components.bullets.head = bullet.append(components.bullets.head);
  },
};
