module.exports = class {
  constructor(obj) {
    this.width = obj.width;
    this.height = obj.height;
    this.positionHorizontal = obj.positionHorizontal;
    this.positionVertical = obj.positionVertical;
    this.speed = obj.speed;
    this.hitState = obj.hitState;
    this.nextEnemy = obj.nextEnemy;
    this.targettedState = false;
  }
  static getDefaultSpec() {
    return {
      width: 20,
      height: 10,
      positionHorizontal: 350,
      positionVertical: 75, // canvas height - height
      speed: 10,
      hitState: false,
      nextEnemy: null,
    };
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
    if (this.positionHorizontal <= boundaryLeft && this.speed < 0) {
      this.speed = -this.speed;
    } else if ((this.positionHorizontal + this.width) >= boundaryRight && this.speed > 0) {
      this.speed = -this.speed;
    }
  }
  update(timeElapsed, boundaryLeft, boundaryRight, components) {
    this.boundaryCheck(boundaryLeft, boundaryRight);
    this.movement(timeElapsed);
    this.hitCheck(components);
  }
  hitCheck(components) {
    if (this.hitState) {
      components.enemies.head = this.remove(components.enemies.head, components.enemies);
    }
  }
  append(head, enemies) {
    enemies.count += 1;
    if (head == null) {
      return this;
    }
    for (let i = head; i != null; i = i.nextEnemy) {
      if (i.nextEnemy == null) {
        i.nextEnemy = this;
        i = i.nextEnemy;
      }
    }
    return head;
  }
  remove(head, enemies) {
    if (this.targettedState === true) {
      enemies.targettedCount -= 1;
    }
    enemies.count -= 1;
    if (head === this) {
      return head.nextEnemy;
    }
    for (let i = head; i.nextEnemy != null; i = i.nextEnemy) {
      if (i.nextEnemy === this) {
        i.nextEnemy = i.nextEnemy.nextEnemy;
      }
      if (i.nextEnemy == null) {
        return head;
      }
    }
    return head;
  }
};
