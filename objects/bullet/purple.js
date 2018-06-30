const Default = require('./default.js');

module.exports = class extends Default {
  constructor(player, enemy) {
    super(player);
    this.positionHorizontal = player.positionHorizontal + (player.width / 2);
    this.positionVertical = player.positionVertical;
    this.displayTime = 200;
    this.enemyPositionHorizontal = enemy.positionHorizontal + (enemy.width / 2);
    this.enemyPositionVertical = enemy.positionVertical + (enemy.height / 2);
  }
  update(timeElapsed, boundary, components) {
    this.displayTime -= timeElapsed;
    if (this.displayTime <= 0) {
      components.bullets.head = super.remove(components.bullets.head);
      components.player.score += 1;
    }
  }
  canvasFill(drawingContext) {
    drawingContext.strokeStyle = 'mediumpurple';
    drawingContext.lineWidth = 10;
    drawingContext.lineCap = 'round';
    drawingContext.beginPath();
    drawingContext.moveTo(this.positionHorizontal, this.positionVertical);
    console.log(this.enemyPositionVertical);
    drawingContext.lineTo(this.enemyPositionHorizontal, this.enemyPositionVertical);
    drawingContext.stroke();
  }
};
