module.exports = class {
  constructor(game, id) {
    this.game = game;
    this.width = 30;
    this.height = 20;
    this.positionX = game.canvas.width / 2;
    this.positionY = game.canvas.height - 25;
    this.speedXInitial = 0;
    this.speedYInitial = 0;
    this.speedXFinal = 0;
    this.speedYFinal = 0;
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
    this.inputSequence = 0;
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
  update(input, time) {
    this.movement(input, time);
    this.powerUpCollisionCheck();
    if (input[13] === true) {
      this.game.bullets.create(this);
    }
  }
  movement(input, time) {
    this.positionXUpdate(time);
    this.positionYUpdate(time);
    this.speedXUpdate(time);
    this.speedYUpdate(time);
    this.accelerateXUpdate(input);
    this.accelerateYUpdate(input);
  }
  positionXUpdate(time) {
    this.positionX +=
      ((this.speedXInitial + this.speedXFinal) * (time / (1000 / 60))) / 2;
    // check if within boundaries
    if (this.positionX < 0) {
      this.positionX = 0;
    } else if (this.positionX + this.width > this.game.canvas.width) {
      this.positionX = this.game.canvas.width - this.width;
    }
  }
  positionYUpdate(time) {
    this.positionY +=
      ((this.speedYInitial + this.speedYFinal) * (time / (1000 / 60))) / 2;
    // check if within boundaries
    if (this.positionY < 0) {
      this.positionY = 0;
    } else if (this.positionY + this.height > this.game.canvas.height) {
      this.positionY = this.game.canvas.height - this.height;
    }
  }
  speedXUpdate(time) {
    // set initial speed to final speed of last loop
    this.speedXInitial = this.speedXFinal;
    this.speedXFinal += this.accelerationX * (time / (1000 / 60));
    // apply friction, doesn't account for case when speed changes signs,
    // but should have negligible impact
    if (this.speedXFinal > 0) {
      this.speedXFinal -= this.friction * (time / (1000 / 60));
      if (this.speedXFinal < 0) {
        this.speedXFinal = 0;
      }
    } else if (this.speedXFinal < 0) {
      this.speedXFinal += this.friction * (time / (1000 / 60));
      if (this.speedXFinal > 0) {
        this.speedXFinal = 0;
      }
    }
    if (this.speedXFinal < -this.maxSpeed) {
      this.speedXFinal = -this.maxSpeed;
    } else if (this.speedXFinal > this.maxSpeed) {
      this.speedXFinal = this.maxSpeed;
    }
  }
  speedYUpdate(time) {
    this.speedYInitial = this.speedYFinal;
    this.speedYFinal += this.accelerationY * (time / (1000 / 60));
    // apply friction, doesn't account for case when speed changes signs,
    // but should have negligible impact
    if (this.speedYFinal > 0) {
      this.speedYFinal -= this.friction * (time / (1000 / 60));
      if (this.speedYFinal < 0) {
        this.speedYFinal = 0;
      }
    } else if (this.speedYFinal < 0) {
      this.speedYFinal += this.friction * (time / (1000 / 60));
      if (this.speedYFinal > 0) {
        this.speedYFinal = 0;
      }
    }
    if (this.speedYFinal < -this.maxSpeed) {
      this.speedYFinal = -this.maxSpeed;
    } else if (this.speedYFinal > this.maxSpeed) {
      this.speedYFinal = this.maxSpeed;
    }
  }
  accelerateXUpdate(input) {
    if (input[37] === true && input[39] !== true) {
      this.accelerationX = -this.acceleration;
    } else if (input[37] !== true && input[39] === true) {
      this.accelerationX = this.acceleration;
    } else if (
      (input[37] !== true && input[39] !== true) ||
      (input[37] === true && input[39] === true)
    ) {
      this.accelerationX = 0;
    }
  }
  accelerateYUpdate(input) {
    if (input[38] === true && input[40] !== true) {
      this.accelerationY = -this.acceleration;
    } else if (input[38] !== true && input[40] === true) {
      this.accelerationY = this.acceleration;
    } else if (
      (input[38] !== true && input[40] !== true) ||
      (input[38] === true && input[40] === true)
    ) {
      this.accelerationY = 0;
    }
  }
  powerUpCollisionCheck() {
    for (let i = 0; i < this.game.powerUps.entities.length; i += 1) {
      const powerUp = this.game.powerUps.entities[i];
      if (
        powerUp.removeFromGame === false &&
        powerUp.positionX >= this.positionX &&
        powerUp.positionX <= this.positionX + this.width &&
        powerUp.positionY >= this.positionY &&
        powerUp.positionY <= this.positionY + this.height
      ) {
        if (this.bulletType === powerUp.color) {
          if (this.bulletLevel < this.maxBulletLevel) {
            this.bulletLevel += 1;
          }
        } else {
          this.bulletType = powerUp.color;
          this.bulletLevel = 1;
        }
        powerUp.removeFromGame = true;
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
