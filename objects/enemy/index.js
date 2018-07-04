module.exports = class {
  constructor() {
    this.width = 20;
    this.height = 10;
    this.positionX = 350;
    this.positionY = 75;
    this.speed = 10;
    this.stateHit = false;
    this.nextEnemy = null;
    this.stateTargetted = false;
  }
  canvasFill(context) {
    context.fillRect(
      this.positionX,
      this.positionY,
      this.width,
      this.height,
    );
  }
  movement(time) {
    this.positionX += this.speed * (time / (1000 / 60));
  }
  boundaryCheck(boundaryLeft, boundaryRight) {
    if (this.positionX <= boundaryLeft && this.speed < 0) {
      this.speed = -this.speed;
    } else if ((this.positionX + this.width) >= boundaryRight && this.speed > 0) {
      this.speed = -this.speed;
    }
  }
  update(time, boundaryLeft, boundaryRight, components) {
    this.boundaryCheck(boundaryLeft, boundaryRight);
    this.movement(time);
    this.hitCheck(components);
  }
  hitCheck(components) {
    if (this.stateHit) {
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
    if (this.stateTargetted === true) {
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
