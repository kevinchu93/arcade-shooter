module.exports = {
  config: {
    blue: {
      level1: {
        width: 5,
        height: 25,
      },
      level2: {
        width: 7,
        height: 50,
      },
      level3: {
        width: 10,
        height: 75,
      },
      level4: {
        width: 25,
        height: 75,
      },
      level5: {
        width: 30,
        height: 100,
      },
    },
  },
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
    console.log(components);
    let bullet = {};
    switch (components.player.bulletType) {
      case 'white':
        bullet = new Bullet.Default(components.player);
        break;
      case 'orangered':
        bullet = new Bullet.Red(components.player);
        break;
      case 'deepskyblue':
        console.log(components.player.level);
        switch (components.player.level) {
          case 1:
            bullet = new Bullet.Blue(
              components.player,
              this.config.blue.level1.width,
              this.config.blue.level1.height,
            );
            break;
          case 2:
            bullet = new Bullet.Blue(
              components.player,
              this.config.blue.level2.width,
              this.config.blue.level2.height,
            );
            break;
          case 3:
            bullet = new Bullet.Blue(
              components.player,
              this.config.blue.level3.width,
              this.config.blue.level3.height,
            );
            break;
          case 4:
            bullet = new Bullet.Blue(
              components.player,
              this.config.blue.level4.width,
              this.config.blue.level4.height,
            );
            break;
          case 5:
            bullet = new Bullet.Blue(
              components.player,
              this.config.blue.level5.width,
              this.config.blue.level5.height,
            );
            break;
        }
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
