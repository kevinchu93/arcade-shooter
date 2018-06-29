module.exports = class {
  constructor(player) {
    this.width = 5;
    this.height = 10;
    this.speed = 20;
    this.positionHorizontal = player.positionHorizontal + ((player.width - this.width) / 2);
    this.positionVertical = player.positionVertical;
    this.state = true;
    this.type = 'white';
    this.nextBullet = null;
  }
  movement(time) {
    if (this.state) {
      this.positionVertical -= this.speed * (time / (1000 / 60));
    }
  }

  boundaryCheck(boundary, components) {
    if (this.positionVertical + this.height <= boundary) {
      this.remove(components.bullets.head);
      this.state = false;
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
    for (let i = enemyHead; i != null; i = i.nextEnemy) {
      if (
        (
          (
            this.positionVertical >= i.positionVertical &&
            this.positionVertical <= i.positionVertical + i.height
          ) ||
          (
            this.positionVertical + this.height >= i.positionVertical &&
            this.positionVertical + this.height <= i.positionVertical + i.height
          )
        ) &&
        (
          (
            i.positionHorizontal >= this.positionHorizontal &&
            i.positionHorizontal <= this.positionHorizontal + this.width
          ) ||
          (
            i.positionHorizontal + i.width >= this.positionHorizontal &&
            i.positionHorizontal <= this.positionHorizontal + this.width
          )
        )
      ) {
        i.hitState = true;
        return true;
      }
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
