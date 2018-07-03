module.exports = class {
  constructor(canvasWidth, canvasHeight) {
    this.width = 30;
    this.height = 20;
    this.positionX = canvasWidth / 2;
    this.positionY = canvasHeight - 25;
    this.score = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 5;
    this.accelerationX = 0;
    this.accelerationY = 0;
    this.acceleration = 1.2;
    this.friction = 0.3;
    this.bulletType = 'white';
    this.level = 0;
  }
  canvasFill(drawingContext) {
    drawingContext.fillRect(
      this.positionX,
      this.positionY,
      this.width,
      this.height,
    );
    drawingContext.fillText(this.score, 1200, 55);
  }
  update(timeElapsed, canvasElement, keyMap, components) {
    this.movement(keyMap, timeElapsed, canvasElement);
    this.collisionCheckPowerUp(components.powerUps.head);
  }
  movement(keyMap, time, canvasElement) {
    this.positionXUpdate(time, 0, canvasElement.width);
    this.positionYUpdate(time, 0, canvasElement.height);
    this.speedXUpdate(time);
    this.speedYUpdate(time);
    this.accelerateXUpdate(keyMap);
    this.accelerateYUpdate(keyMap);
  }
  positionXUpdate(time, boundaryLeft, boundaryRight) {
    this.positionX += this.speedX * (time / (1000 / 60));
    if (this.positionX < boundaryLeft) {
      this.positionX = boundaryLeft;
    } else if (this.positionX + this.width > boundaryRight) {
      this.positionX = boundaryRight - this.width;
    }
  }
  positionYUpdate(time, boundaryUp, boundaryDown) {
    this.positionY += this.speedY * (time / (1000 / 60));
    if (this.positionY < boundaryUp) {
      this.positionY = boundaryUp;
    } else if (this.positionY + this.height > boundaryDown) {
      this.positionY = boundaryDown - this.height;
    }
  }
  speedXUpdate(time) {
    if (this.speedX > -5 && this.speedX < 5) {
      this.speedX += this.accelerationX * (time / (1000 / 60));
    }
    if (this.speedX > 0) {
      this.speedX -= this.friction * (time / (1000 / 60));
      if (this.speedX < 0) {
        this.speedX = 0;
      }
    } else if (this.speedX < 0) {
      this.speedX += this.friction * (time / (1000 / 60));
      if (this.speedX > 0) {
        this.speedX = 0;
      }
    }
    if (this.speedX < -this.maxSpeed) {
      this.speedX = -this.maxSpeed;
    } else if (this.speedX > this.maxSpeed) {
      this.speedX = this.maxSpeed;
    }
  }
  speedYUpdate(time) {
    if (this.speedY > -5 && this.speedY < 5) {
      this.speedY += this.accelerationY * (time / (1000 / 60));
    }
    if (this.speedY > 0) {
      this.speedY -= this.friction * (time / (1000 / 60));
      if (this.speedY < 0) {
        this.speedY = 0;
      }
    } else if (this.speedY < 0) {
      this.speedY += this.friction * (time / (1000 / 60));
      if (this.speedY > 0) {
        this.speedY = 0;
      }
    }
    if (this.speedY < -this.maxSpeed) {
      this.speedY = -this.maxSpeed;
    } else if (this.speedY > this.maxSpeed) {
      this.speedY = this.maxSpeed;
    }
  }
  accelerateXUpdate(keyMap) {
    if (keyMap[37] === true && keyMap[39] !== true) {
      this.accelerationX = -this.acceleration;
    } else if (keyMap[37] !== true && keyMap[39] === true) {
      this.accelerationX = this.acceleration;
    } else if (
      (keyMap[37] !== true && keyMap[39] !== true) ||
      (keyMap[37] === true && keyMap[39] === true)
    ) {
      this.accelerationX = 0;
    }
  }
  accelerateYUpdate(keyMap) {
    if (keyMap[38] === true && keyMap[40] !== true) {
      this.accelerationY = -this.acceleration;
    } else if (keyMap[38] !== true && keyMap[40] === true) {
      this.accelerationY = this.acceleration;
    } else if (
      (keyMap[38] !== true && keyMap[40] !== true) ||
      (keyMap[38] === true && keyMap[40] === true)
    ) {
      this.accelerationY = 0;
    }
  }
  collisionCheckPowerUp(powerUpHead) {
    for (let i = powerUpHead; i != null; i = i.nextPowerUp) {
      if (
        i.positionHorizontal >= this.positionX &&
        i.positionHorizontal <= this.positionX + this.width &&
        i.positionVertical >= this.positionY &&
        i.positionVertical <= this.positionY + this.height
      ) {
        if (this.bulletType === i.color) {
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
