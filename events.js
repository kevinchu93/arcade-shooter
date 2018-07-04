module.exports = {
  listen(canvas, components, Bullet, keyMap) {
    this.mouseMove(canvas, components.player);
    this.click(canvas, Bullet, components);
    this.keyInput(canvas, keyMap);
  },
  mouseMove(canvas, player) {
    canvas.addEventListener('mousemove', (e) => {
      player.positionX = e.clientX;
      player.positionY = e.clientY;
    });
  },
  click(canvas, Bullet, components) {
    canvas.addEventListener('click', () => {
      components.bullets.create(components, Bullet);
    });
  },
  keyInput(canvas, keyMap) {
    ['keydown', 'keyup'].forEach((eventListener) => {
      canvas.addEventListener(eventListener, (e) => {
        if (e.keyCode !== 116 && e.keyCode !== 123) {
          e.preventDefault();
        }
        keyMap[e.keyCode] = e.type === 'keydown';
      });
    });
  },
};
