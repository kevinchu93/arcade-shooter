module.exports = class {
  constructor(player) {
    this.width = 5;
    this.height = 10;
    this.speed = 20;
    this.positionHorizontal = player.positionX + ((player.width - this.width) / 2);
    this.positionVertical = player.positionY - this.height;
    this.type = player.bulletType;
    this.nextBullet = null;
  }
  movement(time) {
    this.positionVertical -= this.speed * (time / (1000 / 60));
  }

  boundaryCheck(boundary, components) {
    if (this.positionVertical + this.height <= boundary) {
      this.remove(components.bullets.head);
    }
  }

  update(timeElapsed, boundary, components) {
    this.boundaryCheck(boundary, components);
    this.movement(timeElapsed);
    if (this.hitCheck(components.enemies.head)) {
      components.bullets.head = this.remove(components.bullets.head);
      components.player.score += 1;
    }
  }

  canvasFill(drawingContext) {
    drawingContext.fillStyle = this.type;
    drawingContext.fillRect(
      this.positionHorizontal,
      this.positionVertical,
      this.width,
      this.height,
    );
  }
  hitCheck(enemyHead) {
    const Ax1 = this.positionHorizontal;
    const Ax2 = this.positionHorizontal + this.width;
    const Ay1 = this.positionVertical;
    const Ay2 = this.positionVertical + this.height;
    for (let i = enemyHead; i != null; i = i.nextEnemy) {
      if (i.hitState === false) {
        const Bx1 = i.positionHorizontal;
        const Bx2 = i.positionHorizontal + i.width;
        const By1 = i.positionVertical;
        const By2 = i.positionVertical + i.height;
        if (this.constructor.rectangleCollision(Ax1, Ax2, Ay1, Ay2, Bx1, Bx2, By1, By2)) {
          i.hitState = true;
          return true;
        }
      }
    }
    return false;
  }
  static rectangleCollision(Ax1, Ax2, Ay1, Ay2, Bx1, Bx2, By1, By2) {
    if (
      (Ax1 >= Bx1 && Ax1 <= Bx2 && Ay1 >= By1 && Ay1 <= By2) ||
      (Ax2 >= Bx1 && Ax2 <= Bx2 && Ay1 >= By1 && Ay1 <= By2) ||
      (Ax1 >= Bx1 && Ax1 <= Bx2 && Ay2 >= By1 && Ay2 <= By2) ||
      (Ax2 >= Bx1 && Ax2 <= Bx2 && Ay2 >= By1 && Ay2 <= By2) ||
      (Bx1 >= Ax1 && Bx1 <= Ax2 && By1 >= Ay1 && By1 <= Ay2) ||
      (Bx2 >= Ax1 && Bx2 <= Ax2 && By1 >= Ay1 && By1 <= Ay2) ||
      (Bx1 >= Ax1 && Bx1 <= Ax2 && By2 >= Ay1 && By2 <= Ay2) ||
      (Bx2 >= Ax1 && Bx2 <= Ax2 && By2 >= Ay1 && By2 <= Ay2)
    ) {
      return true;
    }
    return false;
  }
  append(head) {
    if (head == null) {
      return this;
    }
    for (let i = head; i != null; i = i.nextBullet) {
      if (i.nextBullet == null) {
        i.nextBullet = this;
        i = i.nextBullet;
      }
    }
    return head;
  }
  remove(head) {
    if (head === this) {
      return head.nextBullet;
    }
    for (let i = head; i.nextBullet != null; i = i.nextBullet) {
      if (i.nextBullet === this) {
        i.nextBullet = i.nextBullet.nextBullet;
      }
      if (i.nextBullet == null) {
        return head;
      }
    }
    return head;
  }
};
