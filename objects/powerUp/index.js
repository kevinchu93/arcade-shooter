module.exports = class {
  constructor() {
    this.radius = 5;
    this.speed = 2;
    this.positionX = null;
    this.positionY = null;
    this.color = null;
    this.stateObtained = false;
    this.nextPowerUp = null;
  }
  canvasFill(context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
    context.fill();
  }
  movement(time) {
    this.positionY += this.speed * (time / (1000 / 60));
  }
  update(time, boundaryBottom, components) {
    this.movement(time);
    this.boundaryCheck(boundaryBottom, components);
    if (this.stateObtained) {
      components.powerUps.head = this.remove(components.powerUps.head);
    }
  }
  boundaryCheck(boundaryBottom, components) {
    if (this.positionVertical >= boundaryBottom) {
      this.remove(components.powerUps.head);
    }
  }
  append(head) {
    if (head == null) {
      return this;
    }
    for (let i = head; i != null; i = i.nextPowerUp) {
      if (i.nextPowerUp == null) {
        i.nextPowerUp = this;
        i = i.nextPowerUp;
      }
    }
    return head;
  }
  remove(head) {
    if (head === this) {
      return head.nextPowerUp;
    }
    for (let i = head; i.nextPowerUp != null; i = i.nextPowerUp) {
      if (i.nextPowerUp === this) {
        i.nextPowerUp = i.nextPowerUp.nextPowerUp;
      }
      if (i.nextPowerUp == null) {
        return head;
      }
    }
    return head;
  }
};
