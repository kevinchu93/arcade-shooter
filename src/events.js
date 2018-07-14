module.exports = {
  listen(Bullet, game) {
    this.mouseMove(game.canvas, game.player);
    this.click(game.canvas, Bullet, game);
    this.keyInput(game.canvas, game.keyMap);
  },
  mouseMove(canvas, player) {
    canvas.addEventListener('mousemove', (e) => {
      player.positionX = e.clientX;
      player.positionY = e.clientY;
    });
  },
  click(canvas, Bullet, game) {
    canvas.addEventListener('click', () => {
      game.bullets.create(game, Bullet);
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
