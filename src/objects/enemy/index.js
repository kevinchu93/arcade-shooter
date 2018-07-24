module.exports = class {
  constructor(game) {
    this.game = game;
    this.width = 20;
    this.height = 10;
    this.positionX = 350;
    this.positionY = 75;
    this.speed = 10;
    this.removeFromGame = false;
    this.nextEnemy = null;
    this.stateTargetted = false;
  }
  draw() {
    this.game.canvasContext.fillRect(
      this.positionX,
      this.positionY,
      this.width,
      this.height,
    );
  }
  movement() {
    this.positionX += this.speed * (this.game.timer.deltaTime / (1000 / 60));
  }
  boundaryCheck() {
    if (this.positionX <= 0 && this.speed < 0) {
      this.speed = -this.speed;
    } else if ((this.positionX + this.width) >= this.game.canvas.width && this.speed > 0) {
      this.speed = -this.speed;
    }
  }
  update() {
    this.movement();
    this.boundaryCheck();
  }
  getState() {
    let state = {};
    Object.keys(this).forEach((key) => {
      if (key !== 'game' && key !== 'nextEnemy') {
        state = { ...state, ...{ [key]: this[key] } };
      }
    });
    return state;
  }
};
