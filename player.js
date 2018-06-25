module.exports = class {
  constructor(obj) {
    this.width = obj.width;
    this.height = obj.height;
    this.positionHorizontal = obj.positionHorizontal;
    this.positionVertical = obj.positionVertical;
    this.score = obj.score;
    this.speed = obj.speed;
    this.stateMoveLeft = obj.stateMoveLeft;
    this.stateMoveRight = obj.stateMoveRight;
    this.stateMoveUp = obj.stateMoveUp;
    this.stateMoveDown = obj.stateMoveDown;
  }
  static getDefaultSpec(canvasWidth, canvasHeight) {
    return {
      width: 15,
      height: 20,
      positionHorizontal: (canvasWidth) / 2,
      positionVertical: canvasHeight - 20, // canvas height - height
      score: 0,
      speed: 5,
      stateMoveLeft: false,
      stateMoveRight: false,
      stateMoveUp: false,
      stateMoveDown: false,
    };
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
  update(timeElapsed, canvasElement, keyMap) {
    this.movementLeft(keyMap, timeElapsed, 0);
    this.movementRight(keyMap, timeElapsed, canvasElement.width);
    this.movementUp(keyMap, timeElapsed, 0);
    this.movementDown(keyMap, timeElapsed, canvasElement.height);
  }
  movementLeft(keyMap, time, boundaryLeft) {
    if (keyMap[37] === true && this.positionHorizontal >= boundaryLeft) {
      this.positionHorizontal -= this.speed * (time / (1000 / 60));
      if (this.positionHorizontal < boundaryLeft) {
        this.positionHorizontal = boundaryLeft;
      }
    }
  }
  movementRight(keyMap, time, boundaryRight) {
    if (keyMap[39] === true && this.positionHorizontal + this.width <= boundaryRight) {
      this.positionHorizontal += this.speed * (time / (1000 / 60));
      if (this.positionHorizontal + this.width > boundaryRight) {
        this.positionHorizontal = boundaryRight - this.width;
      }
    }
  }
  movementUp(keyMap, time, boundaryUp) {
    if (keyMap[38] === true && this.positionVertical >= boundaryUp) {
      this.positionVertical -= this.speed * (time / (1000 / 60));
      if (this.positionVertical < boundaryUp) {
        this.positionVertical = boundaryUp;
      }
    }
  }
  movementDown(keyMap, time, boundaryDown) {
    if (keyMap[40] === true && this.positionVertical + this.height <= boundaryDown) {
      this.positionVertical += this.speed * (time / (1000 / 60));
      if (this.positionVertical + this.height > boundaryDown) {
        this.positionVertical = boundaryDown;
      }
    }
  }
};
