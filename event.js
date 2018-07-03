module.exports = class {
  static mouseMove(canvasElement, player) {
    canvasElement.addEventListener('mousemove', (e) => {
      player.positionHorizontal = e.clientX;
    });
  }

  static click(canvasElement, Bullet, components) {
    canvasElement.addEventListener('click', () => {
      components.bullets.createNewBullet(components, Bullet);
    });
  }
  static keyInput(canvasElement, keyMap) {
    ['keydown', 'keyup'].forEach((eventListener) => {
      canvasElement.addEventListener(eventListener, (e) => {
        e.preventDefault();
        keyMap[e.keyCode] = e.type === 'keydown';
      });
    });
  }
};
