module.exports = class {
  static mouseMove(canvasElement, player) {
    canvasElement.addEventListener('mousemove', (e) => {
      player.positionHorizontal = e.clientX;
    });
  }

  static click(canvasElement, Bullet, components, OrangeRed, DeepSkyBlue) {
    canvasElement.addEventListener('click', () => {
      const bullet = components.bullets.createNew(components, Bullet, OrangeRed, DeepSkyBlue);
      components.bullets.appendNewBullet(bullet, components);
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
