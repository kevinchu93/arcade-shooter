module.exports = {
  bullets: {
    head: null,
    canvasFill(gameArea) {
      for (let i = this.head; i != null; i = i.nextBullet) {
        i.canvasFill(gameArea.canvasElementDrawingContext);
      }
    },
    update(timeElapsed, boundary, components, Bullet, keyMap) {
      if (keyMap[13] === true) {
        const bullet = new Bullet(Bullet.getDefaultSpec());
        bullet.positionHorizontal =
          components.player.positionHorizontal + ((components.player.width - bullet.width) / 2);
        bullet.positionVertical = components.player.positionVertical;
        components.bullets.head = bullet.append(components.bullets.head);
      }
      for (let i = this.head; i != null; i = i.nextBullet) {
        i.update(timeElapsed, boundary, components, Bullet);
      }
    },
  },
  player: null,
  enemies: {
    head: null,
    canvasFill(gameArea) {
      for (let i = this.head; i != null; i = i.nextEnemy) {
        i.canvasFill(gameArea.canvasElementDrawingContext);
      }
    },
    update(timeElapsed, boundaryLeft, boundaryRight, components) {
      for (let i = this.head; i != null; i = i.nextEnemy) {
        i.update(timeElapsed, boundaryLeft, boundaryRight, components);
      }
    },
  },
  powerUps: {
    head: null,
    canvasFill(gameArea) {
      for (let i = this.head; i != null; i = i.nextPowerUp) {
        i.canvasFill(gameArea.canvasElementDrawingContext);
      }
    },
    update(timeElapsed) {
      for (let i = this.head; i != null; i = i.nextPowerUp) {
        i.update(timeElapsed);
      }
    },
  },
};
