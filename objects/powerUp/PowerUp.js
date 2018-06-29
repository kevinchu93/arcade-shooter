module.exports = class {
  constructor(obj) {
    this.radius = obj.radius;
    this.speed = obj.speed;
    this.positionHorizontal = obj.positionHorizontal;
    this.positionVertical = obj.positionVertical;
    this.color = obj.color;
    this.stateObtained = obj.stateObtained;
  }
  static getDefaultSpec() {
    return {
      radius: 5,
      speed: 2,
      positionHorizontal: null,
      positionVertical: null,
      color: null,
      stateObtained: false,
    };
  }
  canvasFill(drawingContext) {
    drawingContext.fillStyle = this.color;
    drawingContext.beginPath();
    drawingContext.arc(this.positionHorizontal, this.positionVertical, this.radius, 0, 2 * Math.PI);
    drawingContext.fill();
  }
  movement(timeElapsed) {
    this.positionVertical += this.speed * (timeElapsed / (1000 / 60));
  }
  update(timeElapsed, boundaryBottom, components) {
    this.movement(timeElapsed);
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
