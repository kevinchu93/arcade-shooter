module.exports = class {
  constructor(game) {
    this.game = game;
    this.width = 5;
    this.height = 10;
    this.speed = 20;
    this.positionX = game.player.positionX + ((game.player.width - this.width) / 2);
    this.positionY = game.player.positionY;
    this.type = game.player.bulletType;
    this.nextBullet = null;
    this.removeFromGame = false;
  }
  movement() {
    this.positionY -= this.speed * (this.game.timer.deltaTime / (1000 / 60));
  }
  boundaryCheck() {
    if (this.positionY + this.height <= 0) {
      this.removeFromGame = true;
    }
  }
  update() {
    this.boundaryCheck();
    this.movement();
    this.hitCheck();
    if (this.removeFromGame === true) {
      this.game.bullets.head = this.remove();
    }
  }
  draw() {
    this.game.canvasContext.fillStyle = this.type;
    this.game.canvasContext.fillRect(
      this.positionX,
      this.positionY,
      this.width,
      this.height,
    );
  }
  hitCheck() {
    const Ax1 = this.positionX;
    const Ax2 = this.positionX + this.width;
    const Ay1 = this.positionY;
    const Ay2 = this.positionY + this.height;
    for (let i = this.game.enemies.head; i != null; i = i.nextEnemy) {
      if (i.removeFromGame === false) {
        const Bx1 = i.positionX;
        const Bx2 = i.positionX + i.width;
        const By1 = i.positionY;
        const By2 = i.positionY + i.height;
        if (this.constructor.rectangleCollision(Ax1, Ax2, Ay1, Ay2, Bx1, Bx2, By1, By2)) {
          i.removeFromGame = true;
          this.game.player.score += 1;
          this.removeFromGame = true;
        }
      }
    }
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
  append() {
    if (this.game.bullets.head == null) {
      return this;
    }
    for (let i = this.game.bullets.head; i != null; i = i.nextBullet) {
      if (i.nextBullet == null) {
        i.nextBullet = this;
        i = i.nextBullet;
      }
    }
    return this.game.bullets.head;
  }
  remove() {
    if (this.game.bullets.head === this) {
      return this.game.bullets.head.nextBullet;
    }
    for (let i = this.game.bullets.head; i.nextBullet != null; i = i.nextBullet) {
      if (i.nextBullet === this) {
        i.nextBullet = i.nextBullet.nextBullet;
      }
      if (i.nextBullet == null) {
        return this.game.bullets.head;
      }
    }
    return this.game.bullets.head;
  }
};
