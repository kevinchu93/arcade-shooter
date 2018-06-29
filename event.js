module.exports = class {
  static mouseMove(canvasElement, player) {
    canvasElement.addEventListener('mousemove', (e) => {
      player.positionHorizontal = e.clientX;
    });
  }

  static click(canvasElement, Bullet, components, OrangeRed, DeepSkyBlue) {
    canvasElement.addEventListener('click', () => {
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
      bullet.positionHorizontal = components.player.positionHorizontal + ((components.player.width - bullet.width) / 2);
      bullet.positionVertical = components.player.positionVertical;
      bullet.type = components.player.bulletType;
      components.bullets.head = bullet.append(components.bullets.head);
    });
  }
  static keyInput(canvasElement, components, Bullet, keyMap) {
    ['keydown', 'keyup'].forEach((eventListener) => {
      canvasElement.addEventListener(eventListener, (e) => {
        keyMap[e.keyCode] = e.type === 'keydown';
      });
    });
  }
};
