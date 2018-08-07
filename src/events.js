const Bullet = require('./objects/bullet/index.js');

module.exports = {
  listen(game) {
    this.mouseMove(game);
    this.click(game);
    this.keyInput(game);
  },
  mouseMove(game) {
    game.canvas.addEventListener('mousemove', (e) => {
      game.player.positionX = e.clientX;
      game.player.positionY = e.clientY;
    });
  },
  click(game) {
    game.canvas.addEventListener('click', () => {
      game.bullets.create(game, Bullet);
    });
  },
  keyInput(game) {
    ['keydown', 'keyup'].forEach((eventListener) => {
      game.canvas.addEventListener(eventListener, (e) => {
        if (e.keyCode !== 116 && e.keyCode !== 123) {
          e.preventDefault();
        }
        game.keyMap[e.keyCode] = e.type === 'keydown';
      });
    });
  },
};
