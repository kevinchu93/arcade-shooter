module.exports = class {
  constructor(obj) {
    this.width = obj.width;
    this.height = obj.height;
    this.positionHorizontal = obj.positionHorizontal;
    this.positionVertical = obj.positionVertical;
    this.score = obj.score;
  }
  canvasFill(drawingContext) {
    drawingContext.fillRect(
      this.positionHorizontal,
      this.positionVertical,
      this.width,
      this.height,
    );
    drawingContext.fillText(this.score, 1200, 55);
  }
  static getDefaultSpec(canvasWidth, canvasHeight) {
    return {
      width: 35,
      height: 20,
      positionHorizontal: (canvasWidth) / 2,
      positionVertical: canvasHeight - 20, // canvas height - height
      score: 0,
    };
  }
};
