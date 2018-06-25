module.exports = class {
  constructor(obj) {
    this.width = obj.width;
    this.height = obj.height;
    this.speed = obj.speed;
    this.positionHorizontal = obj.positionHorizontal;
    this.positionVertical = obj.positionVertical;
    this.state = obj.state;
    this.nextBullet = obj.nextBullet;
  }
  static getDefaultSpec() {
    return {
      width: 5,
      height: 10,
      speed: 20,
      positionHorizontal: undefined,
      positionVertical: undefined, // canvas height - height
      state: true,
      nextBullet: null,
    };
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
        this.positionVertical <= i.positionVertical + i.height &&
        this.positionVertical >= i.positionVertical &&
        this.positionHorizontal >= i.positionHorizontal &&
        this.positionHorizontal <= i.positionHorizontal + i.width
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
