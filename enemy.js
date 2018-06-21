module.exports = class {
  constructor(obj) {
    this.width = obj.width;
    this.height = obj.height;
    this.positionHorizontal = obj.positionHorizontal;
    this.positionVertical = obj.positionVertical;
    this.speed = obj.speed;
  }
  canvasFill(drawingContext) {
    drawingContext.fillRect(
      this.positionHorizontal,
      this.positionVertical,
      this.width,
      this.height,
    );
  }
  movement(timeElapsed) {
    this.positionHorizontal += this.speed * (timeElapsed / (1000 / 60));
  }
  boundaryCheck(boundaryLeft, boundaryRight) {
    if (this.positionHorizontal <= boundaryLeft ||
      (this.positionHorizontal + this.width) >= boundaryRight) {
      this.speed = -this.speed;
    }
  }
  update(timeElapsed, boundaryLeft, boundaryRight) {
    this.boundaryCheck(boundaryLeft, boundaryRight);
    this.movement(timeElapsed);
  }
  static getDefaultSpec() {
    return {
      width: 50,
      height: 30,
      positionHorizontal: 350,
      positionVertical: 75, // canvas height - height
      speed: 20,
    };
  }
};
