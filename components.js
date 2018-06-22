module.exports = {
  bullets: {
    head: null,
    canvasFill(gameArea) {
      for (let i = this.head; i != null; i = i.next) {
        i.canvasFill(gameArea.canvasElementDrawingContext);
      }
    },
    update(timeElapsed, boundary, components, Bullet) {
      for (let i = this.head; i != null; i = i.next) {
        i.update(timeElapsed, 0, components, Bullet);
      }
    },
  },
  player: null,
  enemies: {
    head: null,
    canvasFill(gameArea) {
      for (let i = this.head; i != null; i = i.next) {
        i.canvasFill(gameArea.canvasElementDrawingContext);
      }
    },
    update(timeElapsed, boundaryLeft, boundaryRight, components) {
      for (let i = this.head; i != null; i = i.next) {
        i.update(timeElapsed, 0, 1366, components);
      }
    },
  },
};
