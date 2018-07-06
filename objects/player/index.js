module.exports = class {
  constructor(canvasWidth, canvasHeight) {
    this.width = 30;
    this.height = 20;
    this.positionX = canvasWidth / 2;
    this.positionY = canvasHeight - 25;
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 5;
    this.accelerationX = 0;
    this.accelerationY = 0;
    this.acceleration = 1.2;
    this.friction = 0.3;
    this.bulletType = 'white';
    this.bulletLevel = 0;
    this.maxBulletLevel = 5;
    this.score = 0;
  }
  canvasFill(context) {
    context.fillRect(
      this.positionX,
      this.positionY,
      this.width,
      this.height,
    );
    context.fillText(this.score, 1200, 55);
  }
  update(time, canvas, keyMap, components) {
    this.movement(keyMap, time, canvas);
    this.powerUpCollisionCheck(components.powerUps.head);
  }
  movement(keyMap, time, canvas) {
    this.positionXUpdate(time, 0, canvas.width);
    this.positionYUpdate(time, 0, canvas.height);
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
    if (this.speedX > -this.maxSpeed && this.speedX < this.maxSpeed) {
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
    if (this.speedY > -this.maxSpeed && this.speedY < this.maxSpeed) {
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
  powerUpCollisionCheck(powerUpHead) {
    for (let i = powerUpHead; i != null; i = i.nextPowerUp) {
      if (
        i.positionX >= this.positionX &&
        i.positionX <= this.positionX + this.width &&
        i.positionY >= this.positionY &&
        i.positionY <= this.positionY + this.height
      ) {
        if (this.bulletType === i.color) {
          if (this.bulletLevel < this.maxBulletLevel) {
            this.bulletLevel += 1;
          }
        } else {
          this.bulletType = i.color;
          this.bulletLevel = 1;
        }
        i.stateObtained = true;
      }
    }
  }
};
