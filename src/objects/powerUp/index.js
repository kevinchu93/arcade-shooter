module.exports = class {
  constructor(game) {
    this.game = game;
    this.radius = 5;
    this.speed = 2;
    this.positionX = Math.floor(Math.random() * (game.width || game.canvas.width)); // temp
    this.positionY = -200;
    this.color = game.powerUps.types[Math.floor(Math.random() * game.powerUps.types.length)];
    this.removeFromGame = false;
    this.nextPowerUp = null;
  }
  draw() {
    this.game.canvasContext.fillStyle = this.color;
    this.game.canvasContext.beginPath();
    this.game.canvasContext.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
    this.game.canvasContext.fill();
  }
  movement(time) {
    this.positionY += this.speed * (time / (1000 / 60));
  }
  update(time) {
    this.movement(time);
    this.boundaryCheck();
  }
  boundaryCheck() {
    if (this.positionY >= this.game.canvas.height) {
      this.removeFromGame = true;
    }
  }
  getState() {
    let state = {};
    Object.keys(this).forEach((key) => {
      if (key !== 'game' && key !== 'nextPowerUp') {
        state = { ...state, ...{ [key]: this[key] } };
      }
    });
    return state;
  }
};
