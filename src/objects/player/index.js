module.exports = class {
  constructor(game, id) {
    this.game = game;
    this.width = 30;
    this.height = 20;
    this.positionX = game.canvas.width / 2;
    this.positionY = game.canvas.height - 25;
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
    this.socketId = id;
    this.keyMap = [];
  }
  draw() {
    this.game.canvasContext.fillRect(
      this.positionX,
      this.positionY,
      this.width,
      this.height,
    );
    this.game.canvasContext.fillText(this.score, 1200, 55);
  }
  update() {
    this.movement();
    this.powerUpCollisionCheck();
    if (this.keyMap[13] === true) {
      this.game.bullets.create(this.game, this);
    }
  }
  movement() {
    this.positionXUpdate();
    this.positionYUpdate();
    this.speedXUpdate();
    this.speedYUpdate();
    this.accelerateXUpdate();
    this.accelerateYUpdate();
  }
  positionXUpdate() {
    this.positionX += this.speedX * (this.game.timer.deltaTime / (1000 / 60));
    if (this.positionX < 0) {
      this.positionX = 0;
    } else if (this.positionX + this.width > this.game.canvas.width) {
      this.positionX = this.game.canvas.width - this.width;
    }
  }
  positionYUpdate() {
    this.positionY += this.speedY * (this.game.timer.deltaTime / (1000 / 60));
    if (this.positionY < 0) {
      this.positionY = 0;
    } else if (this.positionY + this.height > this.game.canvas.height) {
      this.positionY = this.game.canvas.height - this.height;
    }
  }
  speedXUpdate() {
    if (this.speedX > -this.maxSpeed && this.speedX < this.maxSpeed) {
      this.speedX += this.accelerationX * (this.game.timer.deltaTime / (1000 / 60));
    }
    if (this.speedX > 0) {
      this.speedX -= this.friction * (this.game.timer.deltaTime / (1000 / 60));
      if (this.speedX < 0) {
        this.speedX = 0;
      }
    } else if (this.speedX < 0) {
      this.speedX += this.friction * (this.game.timer.deltaTime / (1000 / 60));
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
  speedYUpdate() {
    if (this.speedY > -this.maxSpeed && this.speedY < this.maxSpeed) {
      this.speedY += this.accelerationY * (this.game.timer.deltaTime / (1000 / 60));
    }
    if (this.speedY > 0) {
      this.speedY -= this.friction * (this.game.timer.deltaTime / (1000 / 60));
      if (this.speedY < 0) {
        this.speedY = 0;
      }
    } else if (this.speedY < 0) {
      this.speedY += this.friction * (this.game.timer.deltaTime / (1000 / 60));
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
  accelerateXUpdate() {
    if (this.keyMap[37] === true && this.keyMap[39] !== true) {
      this.accelerationX = -this.acceleration;
    } else if (this.keyMap[37] !== true && this.keyMap[39] === true) {
      this.accelerationX = this.acceleration;
    } else if (
      (this.keyMap[37] !== true && this.keyMap[39] !== true) ||
      (this.keyMap[37] === true && this.keyMap[39] === true)
    ) {
      this.accelerationX = 0;
    }
  }
  accelerateYUpdate() {
    if (this.keyMap[38] === true && this.keyMap[40] !== true) {
      this.accelerationY = -this.acceleration;
    } else if (this.keyMap[38] !== true && this.keyMap[40] === true) {
      this.accelerationY = this.acceleration;
    } else if (
      (this.keyMap[38] !== true && this.keyMap[40] !== true) ||
      (this.keyMap[38] === true && this.keyMap[40] === true)
    ) {
      this.accelerationY = 0;
    }
  }
  powerUpCollisionCheck() {
    for (let i = this.game.powerUps.head; i != null; i = i.nextPowerUp) {
      if (
        i.removeFromGame === false &&
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
        i.removeFromGame = true;
      }
    }
  }
  getState() {
    let state = {};
    Object.keys(this).forEach((key) => {
      if (key !== 'game') {
        state = { ...state, ...{ [key]: this[key] } };
      }
    });
    return state;
  }
};
