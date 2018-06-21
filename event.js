module.exports = class {
  static mouseMove(canvasElement, player) {
    canvasElement.addEventListener('mousemove', (e) => {
      player.positionHorizontal = e.clientX;
    });
  }

  static click(canvasElement, Bullet, components, player) {
    canvasElement.addEventListener('click', () => {
      const bullet = new Bullet(Bullet.getDefaultSpec());
      bullet.positionHorizontal = player.positionHorizontal + ((player.width - bullet.width) / 2);
      bullet.positionVertical = player.positionVertical;
      components.bulletHead = Bullet.append(components.bulletHead, bullet);
    });
  }
};
