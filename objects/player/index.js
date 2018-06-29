module.exports = class {
  constructor(canvasWidth, canvasHeight) {
    this.width = 30;
    this.height = 20;
    this.positionHorizontal = canvasWidth / 2;
    this.positionVertical = canvasHeight - 25;
    this.score = 0;
    this.speed = 5;
    this.bulletType = 'white';
    this.level = 0;
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
  update(timeElapsed, canvasElement, keyMap, components) {
    this.movementLeft(keyMap, timeElapsed, 0);
    this.movementRight(keyMap, timeElapsed, canvasElement.width);
    this.movementUp(keyMap, timeElapsed, 0);
    this.movementDown(keyMap, timeElapsed, canvasElement.height);
    this.collisionCheckPowerUp(components.powerUps.head);
  }
  movementLeft(keyMap, time, boundaryLeft) {
    if (keyMap[37] === true && this.positionHorizontal >= boundaryLeft) {
      this.positionHorizontal -= this.speed * (time / (1000 / 60));
    }
    if (this.positionHorizontal < boundaryLeft) {
      this.positionHorizontal = boundaryLeft;
    }
  }
  movementRight(keyMap, time, boundaryRight) {
    if (keyMap[39] === true && this.positionHorizontal + this.width <= boundaryRight) {
      this.positionHorizontal += this.speed * (time / (1000 / 60));
    }
    if (this.positionHorizontal + this.width > boundaryRight) {
      this.positionHorizontal = boundaryRight - this.width;
    }
  }
  movementUp(keyMap, time, boundaryUp) {
    if (keyMap[38] === true && this.positionVertical >= boundaryUp) {
      this.positionVertical -= this.speed * (time / (1000 / 60));
    }
    if (this.positionVertical < boundaryUp) {
      this.positionVertical = boundaryUp;
    }
  }
  movementDown(keyMap, time, boundaryDown) {
    if (keyMap[40] === true && this.positionVertical + this.height <= boundaryDown) {
      this.positionVertical += this.speed * (time / (1000 / 60));
    }
    if (this.positionVertical + this.height > boundaryDown) {
      this.positionVertical = boundaryDown - this.height;
    }
  }
  collisionCheckPowerUp(powerUpHead) {
    for (let i = powerUpHead; i != null; i = i.nextPowerUp) {
      if (
        i.positionHorizontal >= this.positionHorizontal &&
        i.positionHorizontal <= this.positionHorizontal + this.width &&
        i.positionVertical >= this.positionVertical &&
        i.positionVertical <= this.positionVertical + this.height
      ) {
        if (this.bulletType == i.color) {
          if (this.level < 5) {
            this.level += 1;
          }
        } else {
          this.bulletType = i.color;
          this.level = 1;
        }
        i.stateObtained = true;
      }
    }
  }
};
