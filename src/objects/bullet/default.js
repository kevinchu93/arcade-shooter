module.exports = class {
  constructor(player) {
    this.width = 5;
    this.height = 10;
    this.speed = 20;
    this.positionX = player.positionX + ((player.width - this.width) / 2);
    this.positionY = player.positionY - this.height;
    this.type = player.bulletType;
    this.nextBullet = null;
  }
  movement(time) {
    this.positionY -= this.speed * (time / (1000 / 60));
  }
  boundaryCheck(boundary, components) {
    if (this.positionY + this.height <= boundary) {
      this.remove(components.bullets.head);
    }
  }
  update(time, boundary, components) {
    this.boundaryCheck(boundary, components);
    this.movement(time);
    if (this.hitCheck(components.enemies.head)) {
      components.bullets.head = this.remove(components.bullets.head);
      components.player.score += 1;
    }
  }
  canvasFill(context) {
    context.fillStyle = this.type;
    context.fillRect(
      this.positionX,
      this.positionY,
      this.width,
      this.height,
    );
  }
  hitCheck(enemyHead) {
    const Ax1 = this.positionX;
    const Ax2 = this.positionX + this.width;
    const Ay1 = this.positionY;
    const Ay2 = this.positionY + this.height;
    for (let i = enemyHead; i != null; i = i.nextEnemy) {
      if (i.stateHit === false) {
        const Bx1 = i.positionX;
        const Bx2 = i.positionX + i.width;
        const By1 = i.positionY;
        const By2 = i.positionY + i.height;
        if (this.constructor.rectangleCollision(Ax1, Ax2, Ay1, Ay2, Bx1, Bx2, By1, By2)) {
          i.stateHit = true;
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
