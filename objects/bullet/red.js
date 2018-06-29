const Default = require('./default.js');

module.exports = class extends Default {
  constructor(player) {
    super(player);
    this.test = 'test';
    this.leftPositionHorizontal = this.positionHorizontal - 15;
    this.leftPositionVertical = this.positionVertical;
    this.rightPositionHorizontal = this.positionHorizontal + 15;
    this.rightPositionVertical = this.positionVertical;
  }
  canvasFill(drawingContext) {
    super.canvasFill(drawingContext);
    drawingContext.fillRect(
      this.leftPositionHorizontal,
      this.leftPositionVertical,
      this.width,
      this.height,
    );
    drawingContext.fillRect(
      this.rightPositionHorizontal,
      this.rightPositionVertical,
      this.width,
      this.height,
    );
  }
  movement(time) {
    super.movement(time);
    if (this.state) {
      this.leftPositionVertical -= this.speed * (time / (1000 / 60));
      this.rightPositionVertical -= this.speed * (time / (1000 / 60));
    }
  }
};
